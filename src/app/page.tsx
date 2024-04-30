import { SeccionPrimeraInicio } from "@/components/SeccionPrimeraInicio";
import { SeccionSecundariaInicio } from "@/components/SeccionSecundariaInicio";
import SeccionTerceraInicio from "@/components/SeccionTerceraInicio";
import { DialogDefault } from "@/components/ModalAdvert";

export default function Home() {
  return (
    <>
      <SeccionPrimeraInicio />
      <SeccionSecundariaInicio />
      <SeccionTerceraInicio />
      <DialogDefault />
    </>
  );
}
