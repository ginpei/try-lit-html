import { html, render } from 'https://unpkg.com/lit-html?module';

/**
 * @typedef {{
 *   done: boolean;
 *   id: string;
 *   title: string;
 * }} Todo
 */

/**
 * @typedef {{
 *   items: Todo[];
 * }} HomePageProps
 */

main({
  items: [
    { id: "1", name: "Apple", done: false },
    { id: "2", name: "Banana", done: true },
    { id: "3", name: "Candy", done: false },
  ],
});

/**
 * @param {HomePageProps} props
 */
function main(props) {
  const Main = () => Homepage(props);
  render(Main(), document.body);
}

/**
 * @param {HomePageProps} props
 */
function Homepage(props) {
  const { items } = props;

  /**
   * @param {Todo} item
   */
  const onItemClick = (item) => {
    /** @type {HomePageProps} */
    const updated = {
      ...props,
      items: props.items.map((v) =>
        v.id === item.id
          ? { ...item, done: !item.done }
          : v
      ),
    };
    main(updated);
  };

  return html`
    <div class="HomePage">
      <h1>
        Todo List (
        ${items.filter((v) => v.done).length}
        /
        ${items.length}
        )
      </h1>
      <ul>
        ${items.map((item) => TodoItem({ item, onChange: onItemClick }))}
      </ul>
    </div>
  `;
}

/**
 * @param {{ item: Todo, onChange: (item: Todo) => void }} props
 */
function TodoItem({ item, onChange }) {
  const onCheckboxClick = () => {
    onChange(item);
  };

  return html`
    <li data-id=${item.id} ?data-done=${item.done}>
      <label>
        <input
          ?checked=${item.done}
          @change=${onCheckboxClick}
          type="checkbox"
        />
        ${item.name}
      </label>
    </li>
  `;
}
