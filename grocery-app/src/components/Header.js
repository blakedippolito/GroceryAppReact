import Button from "./Button"

const Header = ({ title, onAdd, showAdd }) => {
    return (
        <>
            <header>{title}</header>
            <Button onClick={onAdd}></Button>
        </>


    )
}

export default Header