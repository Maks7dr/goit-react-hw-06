import Contact from '../Contact/Contact';
import css from './ContactList.module.css';

const ContactList = ({ conts }) => {
  return (
    <ul className={css.list}>
      {conts.map((cont) => (
        <li className={css.item} key={cont.id}>
          <Contact id={cont.id} name={cont.name} number={cont.number} />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
