import { html, render } from './LitHtml.js';

/**
 * @typedef {{
 *   items: Todo[];
 * }} State
 */

/**
 * @typedef {{
 *   done: boolean;
 *   id: string;
 *   title: string;
 * }} Todo
 */

// ----------------------------------------------------------------

/** @type {State} */
const state = {
  items: [
    createTodo({ title: "Apple", done: true }),
    createTodo({ title: "Banana" }),
    createTodo({ title: "Candy" }),
  ],
};

main();

// ----------------------------------------------------------------

function main() {
  setState({});
}

/**
 * @param {Partial<State>} updates
 */
function setState(updates) {
  Object.assign(state, updates);
  render(Homepage(), document.body);
}

function Homepage() {
  const { items } = state;

  const onAddClick = () => {
    const title = window.prompt("Title");
    if (!title) {
      return;
    }

    const item = createTodo({ title });
    setState({ items: [...items, item] });
  };

  const onClearClick = () => {
    setState({ items: items.filter((v) => !v.done) });
  };

  /**
   * @param {Todo} item
   */
  const onItemClick = (item) => {
    const items = state.items.map((v) =>
      v.id === item.id
        ? { ...item, done: !item.done }
        : v
    );
    setState({ items });
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
        <button @click=${onClearClick}>Clear</button>
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
          .checked=${item.done}
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
