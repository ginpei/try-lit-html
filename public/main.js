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
    createTodo({ title: "Apple", done: true }),
    createTodo({ title: "Banana" }),
    createTodo({ title: "Candy" }),
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

  const onAddClick = () => {
    const title = window.prompt("Title");
    if (!title) {
      return;
    }

    const item = createTodo({ title });
    main({
      ...props,
      items: [...items, item],
    })
  };

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
      <p>
        <button @click=${onAddClick}>Add...</button>
      </p>
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
        ${item.title}
      </label>
    </li>
  `;
}

/**
 * @param {Partial<Todo>} initial
 * @returns {Todo}
 */
function createTodo(initial) {
  return {
    done: false,
    id: Math.random().toFixed(34).slice(2),
    title: "",
    ...initial,
  }
}
