import AppointmentForm from "@/components/forms/AppointmentForm";
import { SearchParamProps } from "@/types";
import PatientForm from "@/components/forms/PatientForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getPatient } from "@/lib/actions/patient.actions";

async function NewAppointment({ params: { userId } }: SearchParamProps) {
  const patient = await getPatient(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="patiaent"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit"
          />
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient?.$id}
          />

          <p className="copyright py-12">&copy; 2024 CarePuls</p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
        width={1000}
        height={1000}
      />
    </div>
  );
}

export default NewAppointment;
