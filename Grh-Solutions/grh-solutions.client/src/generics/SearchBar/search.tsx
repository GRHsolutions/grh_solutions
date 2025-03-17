import Paper from "@mui/material/Paper"
import InputBase from "@mui/material/InputBase"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import SearchIcon from "@mui/icons-material/Search"

interface SearchBarProps {
  value: string;
  onChange: (newValue: string) => void;
  onSubmit: () => void;
}
export default function SearchBar({
  value,
  onChange,
  onSubmit,
}: SearchBarProps) {
  return (
    <Paper
      component="form"
      onSubmit={(e: any) => {
        e.preventDefault();
        onSubmit();
      }}
      sx={{ 
        p: "1px 2px", 
        display: "flex", 
        alignItems: "center",
        width: 350,
        height: 35
      }}
    >
      <InputBase
        value={value}
        onChange={(e: any) => onChange(e.target.value as string)}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search..."
        inputProps={{ "aria-label": "search google maps" }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: "5px" }} aria-label="search" onClick={onSubmit}>
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}
