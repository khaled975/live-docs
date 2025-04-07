import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function UserTypeSelector({ userType, setUserType, onClickHandler }) {
  const accessChangeHandler = (type) => {
    setUserType(type);
    onClickHandler && onClickHandler(type);
  };
  return (
    <Select
      className=""
      value={userType}
      onValueChange={(type) => accessChangeHandler(type)}
    >
      <SelectTrigger className="shad-select">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="border-none bg-dark-200">
        <SelectItem value="viewer" className="shad-select-item">
          Can view
        </SelectItem>
        <SelectItem value="editor" className="shad-select-item">
          Can edit
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export default UserTypeSelector;
