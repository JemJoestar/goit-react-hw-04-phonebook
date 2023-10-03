
import css from "./PhoneBook.module.css"

export const Filter = ({ handleInput, state }) => {
  return (
    <input
      className={css.input}
      type="text"
      name="filter"
      value={state.filter}
      onChange={handleInput}
      // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      placeholder="Search..."
      autoComplete="off"
      required
    />
  );
};
