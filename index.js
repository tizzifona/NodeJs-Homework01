import { program } from "commander";
import {
    listContacts,
    getContactById,
    removeContact,
    addContact,
} from "./contacts.js";

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const allContacts = await listContacts();
            return console.table(allContacts);

        case "get":
            const contactById = await getContactById(id);
            return console.table(contactById);

        case "add":
            const newContact = await addContact(name, email, phone);
            return console.table(newContact);

        case "remove":
            const deletedContact = await removeContact(id);
            return console.table(deletedContact);

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}
program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
invokeAction(argv);