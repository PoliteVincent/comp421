import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  return (
    <div className="flex w-1/2 max-wd-sm items-center space-x-2">
      <Input placeholder="Search for something?" />
      <Button type="submit">Search</Button>
    </div>
  );
}
