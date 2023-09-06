const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the contacts file:", err);
      return;
    }

    const contacts = JSON.parse(data);
    console.log(contacts);
  });
}

function getContactById(contactId) {
    fs.readFile(contactsPath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading the contacts file:", err);
            return;
        }
        const contacts = JSON.parse(data);
        const contact = contacts.find((c) => c.id === contactId);

        if (contact) {
          console.log("Contact found:");
          console.log(contact);
        } else {
          console.log("Contact not found!");
        }
  })
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the contacts file:", err);
      return;
    }

    const contacts = JSON.parse(data);
    const filteredContacts = contacts.filter((c) => c.id !== contactId);

    if (filteredContacts.length === contacts.length) {
      console.log("Contact not found!");
      return;
    }

    fs.writeFile(
      contactsPath,
      JSON.stringify(filteredContacts, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error("Error writing the contacts file:", err);
          return;
        }

        console.log("Contact removed successfully!");
      }
    );
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the contacts file:", err);
      return;
    }

    const contacts = JSON.parse(data);
    const newContact = { name, email, phone };
    contacts.push(newContact);

    fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error("Error writing the contacts file:", err);
          return;
        }

        console.log("Contact added successfully!");
      }
    );
  });
}
module.exports = {
    listContacts,
    getContactById,
    removeContact,
  addContact,
};