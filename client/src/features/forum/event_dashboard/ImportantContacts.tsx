import { Dialog } from "../../../components/Dialog/Dialog";

const contactList = [
  { name: "SAC - Dr. T. Swarupa Rani", phone: 9908264477 },
  { name: "FO - Dr. Hari Krishna", phone: 9849427591 },
  { name: "CFI - Dr. Palem Praveen", phone: 9849239588 },

];

const ImportantContacts = ({ show, setShow }) => {
  return (
    <Dialog show={show} setShow={setShow} title="Important Contacts">
     <div>
      {contactList.map((contact) => {
        return (
          <div>
            <span className="text-arma-dark-blue"> {contact.name} </span>
            <span> : </span>
            <span className="text-arma-blue"> {contact.phone}</span>
          </div>
        );
      })}
      </div>
    </Dialog>
  );
};

export default ImportantContacts;
