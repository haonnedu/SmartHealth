// // pages/login.tsx
// import { useState } from "react";
// import { TextInput, Button } from "@mantine/core";
// // import { useLogin } from "@/hooks/useLogin";

// // export default function LoginPage() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const { mutate, isLoading, isError } = useLogin();

// //   const handleLogin = () => {
// //     mutate(
// //       { email, password },
// //       {
// //         onSuccess: (data) => {
// //           localStorage.setItem("access_token", data.access_token);
// //           // Optional: fetch user profile and redirect
// //           window.location.href = "/"; // or use next/router
// //         },
// //         onError: () => {
// //           alert("Login failed!");
// //         },
// //       }
// //     );
// //   };

//   return (
//     <div>
//       <TextInput
//         label="Email"
//         value={email}
//         onChange={(e) => setEmail(e.currentTarget.value)}
//       />
//       <TextInput
//         label="Password"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.currentTarget.value)}
//       />
//       <Button onClick={handleLogin} loading={isLoading}>
//         Login
//       </Button>
//       {isError && <p style={{ color: "red" }}>Sai tài khoản hoặc mật khẩu</p>}
//     </div>
//   );
// }
