import { useState } from "react"

export const TodoAdd = ({ onNewTodo }) => {

    const [inputValue, setInputValue] = useState('')

    const onInputChange = ({ target }) => {
        setInputValue(target.value)
    }

    const onSubmit = (e) => {
        e.preventdefault();
        if (inputValue.trim().length <= 1) return;
        setInputValue('');
        onNewTodo(inputValue.trim());
    }

    return (
        <form onSubmit={onSubmit} aria-label='form'>
            <input
                type="text"
                placeholder="¿Que hay que hacer?"
                className="form-control"
                value={inputValue}
                onChange={onInputChange}
            />
            <button
                type="submit"
                className="btn btn-outline-primary mt-1"
            >
                Agregar
            </button>
        </form>
    )
}
