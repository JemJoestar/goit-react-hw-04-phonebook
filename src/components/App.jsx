import {  useEffect, useState } from 'react';
import { PhoneForm } from './PhoneForm';
import { ContactList } from './ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter';

export const App = () => {
  const LOCAL_CONTACTS_KEY = 'local-contacts';

  const [contacts, setContacts] = useState(null);
  const [filter, setFilter] = useState('');

  const addConatct = ({ event, name, number }) => {
    event.preventDefault();
    if (
      contacts.some(
        contact => contact.name === name || contact.number === number
      )
    ) {
      alert('This contact alredy exist');
      return;
    }
    setContacts(pervState => [
      { name: name, number: number, id: nanoid() },
      ...pervState,
    ]);
  };

  const getFilteredContacts = filter => {
    try {
      return contacts.filter(
        contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase()) ||
          contact.number.includes(filter)
      );
    } catch (err) {
      return contacts;
    }
  };

  const handleDelete =  (id) => {
    let newContactsArr = [...contacts]
     setContacts(prevState => {
      if (contacts.find(contact => contact.id === id)) {
        newContactsArr.splice(
          contacts.indexOf(
            contacts.find(contact => contact.id === id)
          ),
          1
        );
      }
      return  newContactsArr;
    });
  };

  useEffect(() => {
    if (contacts === null) {
      setContacts(JSON.parse(localStorage.getItem(LOCAL_CONTACTS_KEY)) ?? []);
      return;
    }

    localStorage.setItem(LOCAL_CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <h1>Phonebook</h1>
      <PhoneForm handleAddNumber={addConatct} />
      <h2>Contacts</h2>
      <Filter filter={filter} setFilter={setFilter} contacts={contacts} />
      <ContactList
        contacts={getFilteredContacts(filter) ?? []}
        handleDelete={handleDelete}
      />
    </>
  );
};
