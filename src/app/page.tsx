// "use client";

// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useRouter } from "next/navigation";
// import styles from "./page.module.css";
// // import dynamic from "next/dynamic";

// // on désactive le SSR pour MetaMask
// // const WalletButton = dynamic(() => import("../componants/WalletButton/WalletButton"), { ssr: false });
// export default function Home() {
//   const router = useRouter();

//   const handleClick = (e: React.FormEvent) => {
//     e.preventDefault();
//     toast.success("Connexion approuvée");
//     // router.push("/Actuality"); 
//   };

//   return (
//     <div className={styles.page}>
//       <div className={styles.cardconnexion}>
//         <h1 className={styles.titleconnexionandmembers}>Connexion</h1>

//         <form className={styles.formconnexion} onSubmit={handleClick}>
//           <label htmlFor="email" className={styles.mailandpasswordtitle}>
//             E-mail
//           </label>
//           <input
//           className={styles.mailandpasswordconnexion}
//             type="email"
//             id="email"
//             name="email"
//             placeholder="Enter your email"
//             required
//           />

//           <label htmlFor="password" className={styles.mailandpasswordtitle}>
//             Mot de passe
//           </label>
//           <input
//           className={styles.mailandpasswordconnexion}
//             type="password"
//             id="password"
//             name="password"
//             placeholder="Enter your password"
//             required
//           />

//           <button type="submit" className={styles.buttonconnexionandmembers}>
           
//             <svg viewBox="0 0 24 24" className={styles.arrtwo} xmlns="http://www.w3.org/2000/svg">
//     <path
//       d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
//     ></path>
//   </svg>
//   <span className={styles.text}>Se connecter</span>
//   <span className={styles.circle}></span>
//   <svg viewBox="0 0 24 24" className={styles.arrone} xmlns="http://www.w3.org/2000/svg">
//     <path
//       d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
//     ></path>
//   </svg>
//           </button>

// <p className={styles.titleconnexionandmembers}>Pas encore membres ? </p>
//  <button type="submit" className={styles.buttonconnexionandmembers}>
           
//             <svg viewBox="0 0 24 24" className={styles.arrtwo} xmlns="http://www.w3.org/2000/svg">
//     <path
//       d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
//     ></path>
//   </svg>
//   <span className={styles.text}>S'inscrire</span>
//   <span className={styles.circle}></span>
//   <svg viewBox="0 0 24 24" className={styles.arrone} xmlns="http://www.w3.org/2000/svg">
//     <path
//       d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
//     ></path>
//   </svg>
//           </button>
//         </form>
//       </div>


//       <ToastContainer position="top-right" autoClose={3000} />
//       {/* <WalletButton /> */}
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { api } from "@/lib/api";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      // Adapte le path selon ton backend: /api/auth/login, /auth/login…
      const { ok, status, data } = await api("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });

      if (ok) {
        toast.success("Connexion approuvée ✅");
        // si ton backend renvoie un token, tu peux le stocker ici
        // localStorage.setItem("token", data.token)
        router.push("/Actuality"); // ou ta route réelle
      } else if (status === 401) {
        toast.error("E-mail ou mot de passe incorrect.");
      } else {
        toast.error(data?.message ?? "Erreur serveur");
      }
    } catch (err) {
      console.error(err);
      toast.error("Impossible de contacter l’API.");
    } finally {
      setLoading(false);
    }
  };

  const goSignup = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/signup"); // page d'inscription si tu l’as
  };

  return (
    <div className={styles.page}>
      <div className={styles.cardconnexion}>
        <h1 className={styles.titleconnexionandmembers}>Connexion</h1>

        <form className={styles.formconnexion} onSubmit={handleLogin}>
          <label htmlFor="email" className={styles.mailandpasswordtitle}>
            E-mail
          </label>
          <input
            className={styles.mailandpasswordconnexion}
            type="email"
            id="email"
            name="email"
            placeholder="Entrez votre e-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />

          <label htmlFor="password" className={styles.mailandpasswordtitle}>
            Mot de passe
          </label>
          <input
            className={styles.mailandpasswordconnexion}
            type="password"
            id="password"
            name="password"
            placeholder="Entrez votre mot de passe"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <button
            type="submit"
            className={styles.buttonconnexionandmembers}
            disabled={loading}
            aria-busy={loading}
          >
            <svg viewBox="0 0 24 24" className={styles.arrtwo} xmlns="http://www.w3.org/2000/svg">
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
            <span className={styles.text}>{loading ? "Connexion..." : "Se connecter"}</span>
            <span className={styles.circle}></span>
            <svg viewBox="0 0 24 24" className={styles.arrone} xmlns="http://www.w3.org/2000/svg">
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
          </button>

          <p className={styles.titleconnexionandmembers}>Pas encore membre ?</p>
          <button onClick={goSignup} className={styles.buttonconnexionandmembers}>
            <svg viewBox="0 0 24 24" className={styles.arrtwo} xmlns="http://www.w3.org/2000/svg">
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
            <span className={styles.text}>S'inscrire</span>
            <span className={styles.circle}></span>
            <svg viewBox="0 0 24 24" className={styles.arrone} xmlns="http://www.w3.org/2000/svg">
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
