import {initializeExpress} from './express';
import express from 'express';

export const Loaders = async ({ expressApp }: { expressApp: express.Application }) => {
    await initializeExpress({ app: expressApp });
}