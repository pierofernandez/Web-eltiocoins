import React from "react";
import CountUp from "../animations/CountUp";

const StatsTemplate = () => {
    return (
        <div style={styles.container}>
            <div style={styles.statsContainer}>
                <div style={styles.statItem}>
                    <span style={styles.number}>
                        <CountUp to={250} duration={3} separator="," />+
                    </span>
                    <p style={styles.label}>Clientes</p>
                </div>
                <div style={styles.statItem}>
                    <span style={styles.number}>
                    $<CountUp to={1000} duration={2} separator="," />
                    </span>
                    <p style={styles.label}>Premios en Sorteos</p>
                </div>
                <div style={styles.statItem}>
                    <span style={styles.number}>
                        <CountUp to={2800} duration={3} separator="," />k+
                    </span>
                    <p style={styles.label}>Monedas Vendidas</p>
                </div>
                <div style={styles.statItem}>
                    <span style={styles.number}>
                        <CountUp to={1800} duration={2} separator="," />+
                    </span>
                    <p style={styles.label}>Visitantes diarios del sitio web</p>
                </div>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        textAlign: "center" as const,
        padding: "40px 20px",
        borderRadius: "10px",
    },
    title: {
        fontSize: "2.5rem",
        fontWeight: "bold",
        color: "#000000",
        marginBottom: "40px",
        marginTop: "10px",
    },
    statsContainer: {
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap" as const,
        gap: "20px",
    },
    statItem: {
        textAlign: "center" as const,
        padding: "20px",
        borderRadius: "10px",
        flex: "1 1 200px",
    },
    number: {
        fontSize: "2.5rem",
        fontWeight: "bold",
        color: "#DDAF13",
        marginBottom: "10px",
    },
    label: {
        fontSize: "1rem",
        color: "#666",
        margin: 0,
    },
};

export default StatsTemplate;