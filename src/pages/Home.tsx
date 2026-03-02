import React from "react";
import {
  Shield,
  ArrowRight,
  AlertTriangle,
  BarChart3,
  Lock,
  Eye,
  CheckCircle,
  Zap,
} from "lucide-react";

const headerHeight = 64; // h-16 en px

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface Benefit {
  title: string;
  description: string;
  icon: string;
}

const Home: React.FC = () => {
  const features: Feature[] = [
    {
      title: "Détection des Menaces",
      description: "Identifiez les menaces en temps réel avec IA.",
      icon: <AlertTriangle className="w-8 h-8" />,
      color: "from-red-500 to-orange-500",
    },
    {
      title: "Gestion des Appareils",
      description: "Surveillez l'état de vos serveurs et appareils.",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Analyses & Rapports",
      description: "Insights détaillés et graphiques en temps réel.",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "from-purple-500 to-blue-500",
    },
    {
      title: "Scans de Sécurité",
      description: "Détectez vulnérabilités et malwares automatiquement.",
      icon: <Lock className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Monitoring Continu",
      description: "Surveillance 24/7 et alertes instantanées.",
      icon: <Eye className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Conformité & Audit",
      description: "Rapports d’audit détaillés pour vos audits.",
      icon: <CheckCircle className="w-8 h-8" />,
      color: "from-indigo-500 to-blue-500",
    },
  ];

  const benefits: Benefit[] = [
    {
      title: "Réduction des Risques",
      description:
        "Neutralisez les menaces avant qu'elles ne deviennent critiques.",
      icon: "🛡️",
    },
    {
      title: "Conformité Garantie",
      description: "Respectez RGPD, PCI-DSS, ISO 27001, etc.",
      icon: "✓",
    },
    {
      title: "ROI Optimisé",
      description: "Réduisez les coûts liés aux incidents de sécurité.",
      icon: "💰",
    },
    {
      title: "Paix d'Esprit",
      description: "Vos données et systèmes sont protégés 24/7.",
      icon: "✌️",
    },
  ];

  return (
    <main className="w-full bg-slate-950 text-white flex flex-col">
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800 flex items-center px-6 justify-between"
        style={{ height: `${headerHeight}px` }}
      >
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-blue-400" />
          <span className="text-xl font-mono font-bold">SecureOps</span>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
          Connexion
        </button>
      </header>

      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center text-center px-6"
        style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
      >
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 font-mono leading-tight">
          Surveillance de Sécurité en Temps Réel
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mb-12 leading-relaxed">
          Une plateforme simple et puissante pour monitorer vos menaces de
          sécurité et protéger vos données critiques.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg flex items-center justify-center">
            Accès Dashboard
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
          <button className="border-2 border-slate-600 text-slate-300 hover:border-blue-500 hover:text-blue-300 hover:bg-slate-900/50 font-semibold px-8 py-3 rounded-lg">
            En Savoir Plus
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="flex flex-col items-center justify-center px-6 bg-slate-900/50 border-t border-slate-800"
        style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
      >
        <h2 className="text-4xl sm:text-5xl font-bold font-mono mb-16 text-center">
          Fonctionnalités Clés
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg bg-slate-800/30 border border-slate-700 hover:border-blue-500/50 transition-colors text-center flex flex-col items-center"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 bg-gradient-to-br ${f.color} text-white`}
              >
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section
        className="flex flex-col items-center justify-center px-6 bg-slate-900/60 border-t border-slate-800"
        style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
      >
        <h2 className="text-4xl sm:text-5xl font-bold font-mono mb-16 text-center">
          Avantages Clés
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="p-8 rounded-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 hover:border-blue-500/50 transition-colors text-center flex flex-col items-center"
            >
              <div className="text-5xl mb-4">{b.icon}</div>
              <h3 className="text-xl font-bold mb-3">{b.title}</h3>
              <p className="text-slate-400 leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="flex flex-col items-center justify-center text-center px-6 bg-blue-900/80 border-t border-slate-800"
        style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
      >
        <h2 className="text-5xl font-bold font-mono mb-6 text-white">
          Commencer Maintenant
        </h2>
        <p className="text-lg sm:text-xl text-blue-100 mb-12 leading-relaxed">
          Essai gratuit pendant 14 jours. Aucune carte bancaire requise.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-12 py-4 rounded-lg transition-all text-lg flex items-center justify-center">
          Démarrer l'Essai Gratuit
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 px-6 text-center text-slate-400">
        <p>&copy; 2024 SecureOps. Tous droits réservés.</p>
      </footer>
    </main>
  );
};

export default Home;
