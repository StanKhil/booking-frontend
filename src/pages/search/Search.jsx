import { useContext, useState } from "react";
import AppContext from "../../features/context/AppContext";

export default function SearchPage() {
  const [activeTab, setActiveTab] = useState("cultural");
  const {serverUrl} = useContext(AppContext);


  const handleTabClick = (tab) => setActiveTab(tab);

  return (
    <>
        <p>Search</p>
    </>
  );
}
