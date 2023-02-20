const FormInput = ({entry , setEntry, entryName}) => {
    return (
        <div>
            {entryName}
            <input
                type="text"
                value={entry}
                name={`${entry}`}
                onChange={({ target }) => setEntry(target.value)}
            />
        </div>
    )
}

export default FormInput