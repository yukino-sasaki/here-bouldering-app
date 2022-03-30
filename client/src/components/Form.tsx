import { Input } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

type CreateForm = {
  name: string;
  place: string;
};

export const Form = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<CreateForm>();

  const onSubmit: SubmitHandler<CreateForm> = (data) => console.log(data);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="name"
          {...register("name", {
            required: "This is required",
            minLength: { value: 4, message: "Minimum length should be 4" },
          })}
        />
      </form>
    </>
  );
};

// import {
//   Button,
//   FormControl,
//   FormErrorMessage,
//   FormLabel,
//   Input,
// } from "@chakra-ui/react";
// import { useForm } from "react-hook-form";

// export default function HookForm() {
//   const {
//     handleSubmit,
//     register,
//     formState: { errors, isSubmitting },
//   } = useForm();

//   function onSubmit(values: string) {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         alert(JSON.stringify(values, null, 2));
//       }, 3000);
//     });
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <FormControl isInvalid={errors.name}>
//         <FormLabel htmlFor="name">First name</FormLabel>
//         <Input
//           id="name"
//           placeholder="name"
//           {...register("name", {
//             required: "This is required",
//             minLength: { value: 4, message: "Minimum length should be 4" },
//           })}
//         />
//         <FormErrorMessage>
//           {errors.name && errors.name.message}
//         </FormErrorMessage>
//       </FormControl>
//       <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
//         Submit
//       </Button>
//     </form>
//   );
// }
