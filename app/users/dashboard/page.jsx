import Image from "next/image";
import { authUserSession } from "../../libs/auth";
const Page = async () => {
  const user = await authUserSession();
  console.log(user);

  return (
    <div>
      <h3>Dashboard</h3>
      <h5 className="mt-8 text-2xl flex flex-col font-bold justify-center items-center">
        WELCOME, {user?.name}
      </h5>
      <Image src={user?.image} alt="..." width={250} height={250} />
    </div>
  );
};

export default Page;
