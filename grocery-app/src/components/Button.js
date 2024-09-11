import Button from 'react-bootstrap/Button';


const AddButton = ({onClick, title, className}) => {
  return (
    <Button onClick={onClick} className={className}>{title}</Button>
  )
}

export default AddButton
