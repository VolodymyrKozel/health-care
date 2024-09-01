import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import { SearchParamProps } from "@/types";

export default async function Register({
  params: { userId },
}: SearchParamProps) {
  const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="patiaent"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit"
          />
          <RegisterForm user={user} />

          <div className="text-14-regular mb-20 flex justify-between">
            <p className="copyright py-12">&copy; 2024 CarePuls</p>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        alt="onboarding"
        className="side-img max-w-[390px]"
        width={1000}
        height={1000}
      />
    </div>
  );
}
