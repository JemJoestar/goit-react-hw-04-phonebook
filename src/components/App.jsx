import { Component } from 'react';
import { PhoneForm } from './PhoneForm';
import { ContactList } from './ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter';

export class App extends Component {
  #LOCAL_CONTACTS_KEY = 'local-contacts';
  state = {
    contacts: [],
    filter: '',
  };
  // & Додавання контактів
  addConatct = ({ event, name, number }) => {
    event.preventDefault();
    if (
      this.state.contacts.some(
        contact => contact.name === name || contact.number === number
      )
    ) {
      alert('This contact alredy exist');
      return;
    }
    this.setState(pervState => ({
      contacts: [
        { name: name, number: number, id: nanoid() },
        ...pervState.contacts,
      ],
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem(this.#LOCAL_CONTACTS_KEY, JSON.stringify(this.state.contacts));
  }

  componentDidMount() {
    this.setState({ contacts: JSON.parse(localStorage.getItem(this.#LOCAL_CONTACTS_KEY)) ?? [] });
  }


  // & Оновлення стейту при вводі
  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
    if ((event.target.name = 'filter')) {
    }
  };

  //& ф-кція що повертає масив відфільтрованих контактів
  getFilteredContacts(filter) {
    return this.state.contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter)
    );
  }

  //& Ф-кція для видалення контакту
  handleDelete = id => {
    console.log();
    this.setState(prevState => {
      if (this.state.contacts.find(contact => contact.id === id)) {
        prevState.contacts.splice(
          this.state.contacts.indexOf(
            this.state.contacts.find(contact => contact.id === id)
          ),
          1
        );
      }
      return { contacts: prevState.contacts };
    });
  };

  render() {
    return (
      <>
        <h1>Phonebook</h1>
        <PhoneForm
          handleAddNumber={this.addConatct}
          state={this.state}
          handleInput={this.handleInput}
        />
        <h2>Contacts</h2>
        <Filter state={this.state} handleInput={this.handleInput} />
        <ContactList
          contacts={this.getFilteredContacts(this.state.filter)}
          handleDelete={this.handleDelete}
        />
      </>
    );
  }
}
