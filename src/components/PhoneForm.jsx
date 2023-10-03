import { Component } from 'react';
import css from "./PhoneBook.module.css"
export class PhoneForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <form className={css.contactForm}
        onSubmit={event => {
          this.setState({ name: '', number: '' });

          this.props.handleAddNumber({
            event,
            name: this.state.name,
            number: this.state.number,
          });
        }}
      >
        <label>
          Name
          <input
          className={css.input}
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInput}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            placeholder="Contact name"
            required
          />
        </label>
        <label>
          Number
          <input
          className={css.input}
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleInput}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            placeholder="Contact number"
            required
          />
        </label>
        <button className={css.addBtn} type="submit">Add contact</button>
      </form>
    );
  }
}
