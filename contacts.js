import * as path from "path";
import fs from "fs/promises";
import {nanoid} from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");
const updateContact = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

export async function listContacts() {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
}

export async function getContactById(id) {
    const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id === id);
    return result || null;
}

export async function removeContact(id) {
    const contacts = await listContacts();
    const index = contacts.findIndex(
        (contact) => contact.id === id
    );
    if (index === -1) return null;
    const [removedContact] = contacts.splice(index, 1);
    await updateContact(contacts);
    return removedContact;
}

export async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        name,
        email,
        phone,
        id: nanoid(),
    };
    contacts.push(newContact);
    await updateContact(contacts);
    return newContact;
}