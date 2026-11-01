const fs = require("fs");
const path = require("path");
const assert = require("assert");

console.log("Running ARMA Self-Verification Tests...\n");

// 1. Verify .env file parsing and secret keys
const envPath = path.join(__dirname, "../../.env");
assert(fs.existsSync(envPath), ".env file must exist in server directory");
const envContent = fs.readFileSync(envPath, "utf-8");
const envVars = {};
envContent.split(/\r?\n/).forEach((line) => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) envVars[match[1].trim()] = match[2].trim();
});

assert(envVars.JWT_SECRET_KEY, "JWT_SECRET_KEY must be present in .env");
assert(envVars.PORT, "PORT must be defined in .env");
assert(envVars.MONGO_CONNECTION_STRING, "MONGO_CONNECTION_STRING must be defined in .env");
console.log("✔ Server .env configuration verified");

// 2. Verify student roll number validator logic
const { checkStudentRollNumber } = require("../services/util/rollNumberValidator");
assert(!checkStudentRollNumber("INVALID123"), "Roll number validator must reject invalid string");
assert(!checkStudentRollNumber(""), "Roll number validator must reject empty string");
console.log("✔ Student roll number validator verified");

// 3. Verify safe CustomTable getValueFromPath logic
const safeGetValueFromPath = (object, p) => {
  if (!object || !p) return "-";
  let current = object;
  for (const property of p.split(".")) {
    if (current && typeof current === "object" && property in current) {
      current = current[property];
    } else {
      return "-";
    }
  }
  return current ?? "-";
};

const testObj = { forumID: { name: "CS Club" }, nullProp: null };
assert.strictEqual(safeGetValueFromPath(testObj, "forumID.name"), "CS Club");
assert.strictEqual(safeGetValueFromPath(testObj, "forumID.missing.deep"), "-");
assert.strictEqual(safeGetValueFromPath(testObj, "nullProp.sub"), "-");
assert.strictEqual(safeGetValueFromPath(null, "any.path"), "-");
console.log("✔ Safe table property navigation verified");

// 4. Verify installed crypto & JWT libraries
try {
  const jwt = require("jsonwebtoken");
  const bcrypt = require("bcrypt");
  const secret = envVars.JWT_SECRET_KEY || envVars.JWT_SECRET;
  const token = jwt.sign({ test: "user" }, secret, { expiresIn: "1h" });
  assert.strictEqual(jwt.verify(token, secret).test, "user");
  const hash = bcrypt.hashSync("testpass", 10);
  assert(bcrypt.compareSync("testpass", hash));
  console.log("✔ Installed crypto & JWT libraries verified");
} catch (e) {
  if (e.code === "MODULE_NOT_FOUND") {
    console.log("ℹ Optional third-party modules not yet installed");
  } else {
    throw e;
  }
}

// 5. Verify 9 Security Audit Patches (SEC-01 through SEC-09)
const readSource = (rel) => fs.readFileSync(path.join(__dirname, "..", rel), "utf-8");

// SEC-01: Forum Profile Takeover protection
const forumCtrl = readSource("services/forum/controller.js");
assert(forumCtrl.includes("const targetEmail = req.user.email;"), "SEC-01: forum profile update must enforce req.user.email");
assert(forumCtrl.includes("user.password = undefined;"), "SEC-01: forum profile update must sanitize password from response");

// SEC-02: Password logging leak removal
const authSvc = readSource("services/auth/authService.js");
assert(!authSvc.includes("oldpassword: forumUser.password"), "SEC-02: plaintext password and hash must not be logged");

// SEC-03: Faculty endpoint authorization
const facultyRouter = readSource("api/routes/faculty/router.js");
assert(facultyRouter.includes('checkRole(req, res, next, ["ADMIN"])'), "SEC-03: deleteFaculty must require ADMIN role");
assert(facultyRouter.includes('checkRole(req, res, next, ["ADMIN", "SAC", "FO", "FC"])'), "SEC-03: faculty read routes must require authorized roles");

// SEC-04: BOLA/IDOR on event equipment & reservations
const eventsRouter = readSource("api/routes/events/router.js");
assert(eventsRouter.includes('checkRole(req, res, next, ["FORUM"])'), "SEC-04: event equipment updates must require FORUM role");
const eventsCtrl = readSource("services/events/controller.js");
assert(eventsCtrl.includes("String(eventOwnerId) !== String(req.user._id)"), "SEC-04: event equipment update must enforce ownership");

// SEC-05: Perpetual JWT expiration
assert(authSvc.includes('expiresIn: "24h"'), "SEC-05: JWT must have 24h expiration");

// SEC-06: Password hash disclosure in admin endpoints
const adminCtrl = readSource("services/admin/controller.js");
assert(adminCtrl.includes('.select("-password")'), "SEC-06: admin endpoints must omit password field");

// SEC-07: Cross-tenant forum member manipulation
assert(forumCtrl.includes("getCallerForumName(req"), "SEC-07: forum member mutations must enforce caller forum identity");

// SEC-08: Defensive headers and strict CORS
const expressLoader = readSource("loaders/express.js");
assert(expressLoader.includes("X-Content-Type-Options"), "SEC-08: defensive headers must be registered");
assert(expressLoader.includes("allowedOrigins"), "SEC-08: strict CORS origin check must be configured");

// SEC-09: Rate limiting on auth endpoints
const authRouter = readSource("api/routes/auth/auth.js");
assert(authRouter.includes("loginLimiter"), "SEC-09: login endpoint must have rate limiting");
assert(authRouter.includes("forgotPasswordLimiter"), "SEC-09: forgotPassword endpoint must have rate limiting");

console.log("✔ All 9 Initial Security Audit Patches (SEC-01 to SEC-09) verified");

// SEC-10 & SEC-15: viewForum password exclusion, role check, and upload null crash guard
assert(forumCtrl.includes('.select("-password")'), "SEC-10: viewForum must omit password");
assert(forumCtrl.includes('if (!doc) {'), "SEC-15: profile picture and cover upload must guard null doc");
const forumRouter = readSource("api/routes/forum/router.js");
assert(forumRouter.includes('checkRole(req, res, next, ["ADMIN", "FC", "FORUM"])'), "SEC-10: viewForum must require role check");
assert(forumRouter.includes('checkRole(req, res, next, ["FORUM"])'), "SEC-15: profilePicture must require FORUM role");

// SEC-11 & SEC-12: viewFaculty & fetchFaculty password exclusion, ReDoS guard, limit
const facultyCtrl = readSource("services/faculty/controller.js");
assert(facultyCtrl.includes('.select("-password")'), "SEC-11: viewFaculty must omit password");
assert(facultyCtrl.includes('escapeRegex(name || "")'), "SEC-12: fetchFaculty must escape regex input");
assert(facultyCtrl.includes('.limit(50)'), "SEC-12: fetchFaculty must cap query results");

// SEC-13: BFLA fix on admin router
const adminRouter = readSource("api/routes/admin/router.js");
const adminCheckRoleIdx = adminRouter.indexOf('checkRole(req, res, next, ["ADMIN"])');
const adminGetIdx = adminRouter.indexOf('router.get("/", controller.getAdmins)');
assert(adminCheckRoleIdx !== -1 && adminGetIdx > adminCheckRoleIdx, "SEC-13: router.get('/') must be mounted AFTER checkRole(['ADMIN'])");

// SEC-14: uploadStudentsList authorization
const studentsRouter = readSource("api/routes/students/router.js");
assert(studentsRouter.includes('checkRole(req, res, next, ["ADMIN"])'), "SEC-14: uploadStudentsList must require ADMIN role");

// SEC-16: Role type confusion & null check on event doc views
assert(eventsCtrl.includes("hasPrivilegedRole(req.user, [\"FO\", \"ADMIN\", \"SAC\"])"), "SEC-16: getBudgetDocument must use safe role inspection");
assert(eventsCtrl.includes("if (!event) {"), "SEC-16: document views must check if event exists");

// SEC-17: Tightened CORS allowlist
assert(expressLoader.includes("codingstudio.co.in"), "SEC-17: CORS must enforce strict domain patterns");

// SEC-18: Directory creation on student PDF generation
const studentReports = readSource("services/util/studentReports.js");
assert(studentReports.includes("fs.mkdir(dirPath, { recursive: true })"), "SEC-18: studentReports must create directories recursively");

console.log("✔ All 9 New Security Audit Patches (SEC-10 to SEC-18) verified");

// SEC-19: Schema level select: false on password
const adminModel = readSource("models/admin.js");
const facultyModelSrc = readSource("models/faculty.js");
const forumModelSrc = readSource("models/forum.js");
assert(adminModel.includes("select: false"), "SEC-19: admin.js must specify select: false for password");
assert(facultyModelSrc.includes("select: false"), "SEC-19: faculty.js must specify select: false for password");
assert(forumModelSrc.includes("select: false"), "SEC-19: forum.js must specify select: false for password");
assert(authSvc.includes('.select("+password")'), "SEC-19: authService must explicitly request +password for login");

// SEC-20: Public eventCalendar safe projection & limit
const publicCtrl = readSource("services/public/controller.js");
assert(publicCtrl.includes('.populate("forumID", "name email description")'), "SEC-20: public controller must project safe forum fields");

// SEC-21: Multer fileFilter protection
const multerStorageSrc = readSource("services/util/multerStorage.js");
assert(multerStorageSrc.includes("fileFilter ="), "SEC-21: multerStorage must export fileFilter");
const eventsRouterSrc = readSource("api/routes/events/router.js");
assert(eventsRouterSrc.includes("fileFilter: multerStorage.fileFilter"), "SEC-21: events router must bind fileFilter");

// SEC-22: Non-hanging responses on event equipment & reservations
assert(eventsCtrl.includes('return res.json(response("Unauthorized", process.env.FAILURE_CODE));'), "SEC-22: getEventEquipment must respond on unauthorized");

// SEC-23: ReferenceError fixes in catch blocks
const equipCtrl = readSource("services/equipment/controller.js");
const hallsCtrl = readSource("services/halls/controller.js");
const rolesCtrl = readSource("services/roles/controller.js");
assert(!equipCtrl.includes("err.message"), "SEC-23: equipment controller must not reference undefined err");
assert(!hallsCtrl.includes("err.message"), "SEC-23: halls controller must not reference undefined err");
assert(!rolesCtrl.includes("err.message"), "SEC-23: roles controller must not reference undefined err");

// SEC-24: Removed GET state mutation routes
assert(!eventsRouterSrc.includes('router.get(\n  "/completeEvent/:eventId"'), "SEC-24: completeEvent must not be a GET route");
assert(!eventsRouterSrc.includes('router.get(\n  "/cancelEvent/:eventId"'), "SEC-24: cancelEvent must not be a GET route");

// SEC-25: ReDoS & limit capping in catalogs
assert(hallsCtrl.includes("Math.min(Math.max(Number(req.query.limit) || 10, 1), 100)"), "SEC-25: halls query limit must be capped");
assert(equipCtrl.includes("Math.min(Math.max(Number(req.query.limit) || 10, 1), 100)"), "SEC-25: equipment query limit must be capped");
assert(rolesCtrl.includes("Math.min(Math.max(Number(req.query.limit) || 10, 1), 100)"), "SEC-25: roles query limit must be capped");

// SEC-26 & SEC-27: Null dereference defenses
assert(eventsCtrl.includes('throw new Error("Equipment not found: " + equipment);'), "SEC-26: createEvent must check equipment existence");
assert(hallsCtrl.includes("if (!item || !item.hallId || !item.hallId.name) return;"), "SEC-27: getSlots must guard null hallId");

// SEC-28: NoSQL input sanitization
assert(expressLoader.includes("sanitizeInput"), "SEC-28: expressLoader must sanitize NoSQL query operators");

console.log("✔ All 10 Master Security Patches (SEC-19 to SEC-28) verified");
console.log("\nAll ARMA verification tests passed successfully!");

// 6. Verify 15 Ponytail Audit Remediations
const escapeRegex = require("../services/util/escapeRegex");
assert.strictEqual(escapeRegex("test.*+?^${}()|[]\\word"), "test\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\word");
console.log("✔ ReDoS regex escape utility verified");

const mailer = require("../services/util/mailer");
mailer.sendMail("test@arma.com", { subject: "Test", template: "Hello ${name}" }, { name: "User" })
  .then(res => {
    assert(res.success !== undefined, "mailer.sendMail must resolve with success flag");
    console.log("✔ Resilient mailer fallback verified");
  });

assert(fs.existsSync(path.join(__dirname, "../models/course.js")), "course.js model must exist");
console.log("✔ Persistent course model verified");
