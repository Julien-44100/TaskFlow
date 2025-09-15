"use client";
import Link from "next/link";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    if (!email || !password) {
      toast.error("Veuillez renseigner un e-mail et un mot de passe.");
      return;
    }

    setLoading(true);
    try {
      toast.success("Connexion simulée côté front ✅");
      setTimeout(() => router.push("/Actuality"), 800);
    } catch (err) {
      console.error(err);
      toast.error("Une erreur inattendue est survenue.");
    } finally {
      setLoading(false);
    }
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
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
            </svg>
            <span className={styles.text}>{loading ? "Connexion..." : "Se connecter"}</span>
            <span className={styles.circle}></span>
            <svg viewBox="0 0 24 24" className={styles.arrone} xmlns="http://www.w3.org/2000/svg">
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
          </button>

          <p className={styles.titleconnexionandmembers}>Pas encore membre ?</p>
          <Link href="/inscription" className={styles.buttonconnexionandmembers}>
            <svg viewBox="0 0 24 24" className={styles.arrtwo} xmlns="http://www.w3.org/2000/svg">
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
            <span className={styles.text}>S'inscrire</span>
            <span className={styles.circle}></span>
            <svg viewBox="0 0 24 24" className={styles.arrone} xmlns="http://www.w3.org/2000/svg">
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
          </Link>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}