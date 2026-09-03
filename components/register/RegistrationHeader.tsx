import Image from "next/image";
import LogoImage from "../../src/assets/images/crmLogo.png";

export default function RegistrationHeader() {
  return (
    <header className="flex h-[6.25rem] items-center justify-center bg-white lg:h-auto lg:bg-transparent lg:pb-4">
      <Image src={LogoImage} alt="FadaWeb CRM" width={150} height={40} />
    </header>
  );
}
