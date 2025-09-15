"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./pages.module.css"; // mettez le CSS dans le même dossier

type Ticket = {
  id: string;
  text: string;
};

export default function Ticketspage() {
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: genId(), text: "Exemple de ticket ✨" },
  ]);

  const addTicket = (index?: number) => {
    const newTicket: Ticket = { id: genId(), text: "" };
    setTickets((prev) => {
      if (index === undefined || index < 0 || index >= prev.length) {
        return [...prev, newTicket];
      }
      const copy = [...prev];
      copy.splice(index + 1, 0, newTicket);
      return copy;
    });
  };

  const removeTicket = (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTicket = (id: string, text: string) => {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Board de Tickets</h1>
        <div className={styles.headerActions}>
          <button type="button" onClick={() => addTicket()} className={styles.primaryBtn}>
            + Ajouter un ticket
          </button>
          <Link href="/" className={styles.linkBtn}>
            Accueil
          </Link>
        </div>
      </header>

      <main className={styles.board}>
        {tickets.map((ticket, idx) => (
          <article key={ticket.id} className={styles.card} aria-label="Ticket">
            <textarea
              className={styles.cardTextarea}
              placeholder="Écrivez quelque chose…"
              value={ticket.text}
              onChange={(e) => updateTicket(ticket.id, e.target.value)}
              rows={4}
            />
            <div className={styles.cardActions}>
              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={() => addTicket(idx)}
                aria-label="Ajouter un ticket après celui-ci"
                title="Ajouter un ticket après celui-ci"
              >
                + Ajouter
              </button>
              <button
                type="button"
                className={styles.dangerBtn}
                onClick={() => removeTicket(ticket.id)}
                aria-label="Supprimer ce ticket"
                title="Supprimer ce ticket"
              >
                Supprimer
              </button>
            </div>
          </article>
        ))}

        {tickets.length === 0 && (
          <div className={styles.empty}>
            <p>Aucun ticket. Commencez par en créer un.</p>
            <button type="button" onClick={() => addTicket()} className={styles.primaryBtn}>
              + Ajouter un ticket
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

function genId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
