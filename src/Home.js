import DataProvider from "./context/DataProvider";
import HomeLayout from "./layouts/HomeLayout";

export default function Home() {
  return (
    <DataProvider>
      <HomeLayout />
    </DataProvider>
  );
}
