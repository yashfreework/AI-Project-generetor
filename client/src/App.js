import { useState } from "react";

function App() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("full");

  const generatePlan = async () => {
    if (!idea) return;

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("http://44.200.165.60:5000/api/project/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea, mode }),
      });

      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      console.error(err);
      setResult("Error generating plan");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚀 AI Project Generator</h1>

      <p style={styles.subtitle}>
        Turn your idea into a complete project plan instantly
      </p>

      <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>

        <button
          onClick={() => setMode("full")}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background: mode === "full" ? "#3b82f6" : "#e2e8f0",
            color: mode === "full" ? "#fff" : "#000",
            fontWeight: "bold",
          }}
        >
          Full Plan
        </button>

        <button
          onClick={() => setMode("stack")}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background: mode === "stack" ? "#3b82f6" : "#e2e8f0",
            color: mode === "stack" ? "#fff" : "#000",
            fontWeight: "bold",
          }}
        >
          Tech Stack Only
        </button>

      </div>

      <p style={{ color: "#94a3b8", fontSize: "14px" }}>
        Mode: {mode === "full" ? "Full Project Plan" : "Tech Stack Only"}
      </p>

      <div style={styles.card}>
        <input
          type="text"
          placeholder="Enter your project idea..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          style={styles.input}
        />

        <button onClick={generatePlan} style={styles.button}>
          {loading ? "Generating..." : "Generate Plan"}
        </button>
      </div>

      {result && (
        <div style={styles.resultBox}>
          <h3>📋 Generated Plan</h3>
          <pre style={styles.result}>{result}</pre>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#94a3b8",
    marginBottom: "30px",
  },
  card: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    display: "flex",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    width: "300px",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    background: "#3b82f6",
    color: "#fff",
    cursor: "pointer",
  },
  resultBox: {
    marginTop: "30px",
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    width: "600px",
  },
  result: {
    whiteSpace: "pre-wrap",
    color: "#e2e8f0",
  },
};

export default App;