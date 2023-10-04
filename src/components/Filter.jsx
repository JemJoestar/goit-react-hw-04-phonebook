
import css from "./PhoneBook.module.css"

export const Filter = ({ filter, setFilter, contacts }) => {

  const handleInput = (event) => {
    setFilter(event.target.value)
  }

  return (
    <input
      className={css.input}
      type="text"
      name="filter"
      value={filter}
      onChange={handleInput}
      // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      placeholder="Search..."
      autoComplete="off"
      required
    />
  );
};
