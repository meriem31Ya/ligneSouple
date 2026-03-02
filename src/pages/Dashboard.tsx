"use client";

import React, { useState, useEffect } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Clock,
  Download,
  Filter,
  Plus,
  RefreshCw,
  Server,
  Shield,
  TrendingUp,
  AlertCircle,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

// interface SecurityMetric {
//   label: string;
//   value: string | number;
//   change?: number;
//   changeType?: "positive" | "negative" | "neutral";
//   icon: React.ReactNode;
// }

interface Threat {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium" | "low";
  timestamp: string;
  device: string;
  status: "active" | "mitigated" | "investigating";
}

// interface Alert {
//   id: string;
//   type: string;
//   message: string;
//   severity: "critical" | "high" | "medium" | "low";
//   timestamp: string;
// }

interface Device {
  id: string;
  name: string;
  status: "online" | "offline" | "at-risk";
  lastSeen: string;
  threatLevel: "low" | "medium" | "high" | "critical";
}

interface ChartDataPoint {
  time: string;
  incidents: number;
  resolved: number;
}

// ============================================================================
// HERO / OVERVIEW SECTION
// ============================================================================

const SecurityOverviewHero: React.FC = () => {
  const [lastUpdated, setLastUpdated] = useState<string>("2 minutes ago");

  const handleRefresh = () => {
    setLastUpdated("just now");
    setTimeout(() => {
      setLastUpdated("1 minute ago");
    }, 60000);
  };

  return (
    <section className="relative min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 pt-20 pb-16 overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><g fill=\"%231e293b\" fill-opacity=\"0.1\"><path d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/></g></g></svg>')] opacity-50" />
        
        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
      </div>{" "}
      */
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 font-mono tracking-tight">
              Security Dashboard
            </h1>
            <p className="text-blue-300 text-sm font-mono">
              Last updated: {lastUpdated}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleRefresh}
              variant="outline"
              className="border-blue-500 text-blue-300 hover:bg-blue-500/10 hover:text-blue-200"
              aria-label="Refresh dashboard"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              aria-label="Download report"
            >
              <Download className="w-4 h-4 mr-2" />
              Report
            </Button>
          </div>
        </div>

        {/* Key metrics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KeyMetricCard
            label="Total Incidents"
            value="247"
            change={12}
            changeType="negative"
            icon={<AlertTriangle className="w-5 h-5" />}
          />
          <KeyMetricCard
            label="Active Devices"
            value="1,284"
            change={5}
            changeType="positive"
            icon={<Server className="w-5 h-5" />}
          />
          <KeyMetricCard
            label="System Uptime"
            value="99.87%"
            change={0.03}
            changeType="positive"
            icon={<CheckCircle className="w-5 h-5" />}
          />
          <KeyMetricCard
            label="Critical Threats"
            value="3"
            change={-1}
            changeType="positive"
            icon={<Shield className="w-5 h-5" />}
          />
        </div>

        {/* Status overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatusCard
            title="Overall Status"
            status="operational"
            description="All systems operational"
            details="No active incidents"
          />
          <StatusCard
            title="Network Health"
            status="warning"
            description="Minor issues detected"
            details="2 devices at risk"
          />
          <StatusCard
            title="Threat Level"
            status="elevated"
            description="Elevated threat level"
            details="Monitor closely"
          />
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// KEY METRIC CARD COMPONENT
// ============================================================================

interface KeyMetricCardProps {
  label: string;
  value: string | number;
  change?: number;
  changeType?: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
}

const KeyMetricCard: React.FC<KeyMetricCardProps> = ({
  label,
  value,
  change,
  changeType = "neutral",
  icon,
}) => {
  const changeColor = {
    positive: "text-emerald-400",
    negative: "text-red-400",
    neutral: "text-slate-400",
  };

  const bgGradient = {
    positive: "from-emerald-500/20 to-emerald-500/5",
    negative: "from-red-500/20 to-red-500/5",
    neutral: "from-blue-500/20 to-blue-500/5",
  };

  return (
    <Card
      className={`bg-gradient-to-br ${bgGradient[changeType]} border-slate-700 hover:border-slate-600 transition-all group cursor-pointer`}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 rounded-lg bg-slate-800/50 text-slate-400 group-hover:text-blue-400 transition-colors">
            {icon}
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400 font-mono">{label}</p>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-3xl font-bold text-white font-mono">{value}</p>
        </div>

        {change !== undefined && (
          <div
            className={`text-xs ${changeColor[changeType]} font-mono flex items-center gap-1`}
          >
            <TrendingUp
              className={`w-3 h-3 ${changeType === "negative" ? "rotate-180" : ""}`}
            />
            {changeType === "negative" ? "+" : ""}
            {change}% {changeType === "positive" ? "down" : "up"}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// ============================================================================
// STATUS CARD COMPONENT
// ============================================================================

interface StatusCardProps {
  title: string;
  status: "operational" | "warning" | "elevated" | "critical";
  description: string;
  details: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  status,
  description,
  details,
}) => {
  const statusConfig = {
    operational: {
      bg: "bg-emerald-500/20",
      border: "border-emerald-500/50",
      dot: "bg-emerald-400",
      text: "text-emerald-400",
    },
    warning: {
      bg: "bg-yellow-500/20",
      border: "border-yellow-500/50",
      dot: "bg-yellow-400",
      text: "text-yellow-400",
    },
    elevated: {
      bg: "bg-orange-500/20",
      border: "border-orange-500/50",
      dot: "bg-orange-400",
      text: "text-orange-400",
    },
    critical: {
      bg: "bg-red-500/20",
      border: "border-red-500/50",
      dot: "bg-red-400",
      text: "text-red-400",
    },
  };

  const config = statusConfig[status];

  return (
    <Card className={`${config.bg} border-2 ${config.border}`}>
      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
          <h3 className="text-white font-mono font-semibold">{title}</h3>
        </div>
        <p className={`text-sm ${config.text} mb-1`}>{description}</p>
        <p className="text-xs text-slate-400 font-mono">{details}</p>
      </CardContent>
    </Card>
  );
};

// ============================================================================
// QUICK STATS SECTION
// ============================================================================

const QuickStatsSection: React.FC = () => {
  return (
    <section className="bg-slate-900/50 border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white font-mono mb-6">
          Quick Stats
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatBox
            label="Open Tickets"
            value="24"
            icon={<AlertCircle className="w-5 h-5" />}
          />
          <StatBox
            label="Today's Alerts"
            value="18"
            icon={<Activity className="w-5 h-5" />}
          />
          <StatBox
            label="Resolved Issues"
            value="156"
            icon={<CheckCircle className="w-5 h-5" />}
          />
          <StatBox
            label="Avg Response"
            value="4.2 min"
            icon={<Clock className="w-5 h-5" />}
          />
        </div>
      </div>
    </section>
  );
};

interface StatBoxProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

const StatBox: React.FC<StatBoxProps> = ({ label, value, icon }) => (
  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-blue-600 transition-colors group">
    <div className="flex items-center gap-3 mb-2">
      <div className="text-blue-400 group-hover:text-cyan-400 transition-colors">
        {icon}
      </div>
      <p className="text-xs text-slate-400 font-mono">{label}</p>
    </div>
    <p className="text-2xl font-bold text-white font-mono">{value}</p>
  </div>
);

// ============================================================================
// RECENT THREATS TABLE
// ============================================================================

const RecentThreatsSection: React.FC = () => {
  const threats: Threat[] = [
    {
      id: "1",
      title: "Suspicious login attempt",
      severity: "high",
      timestamp: "5 minutes ago",
      device: "workstation-042",
      status: "investigating",
    },
    {
      id: "2",
      title: "Malware signature detected",
      severity: "critical",
      timestamp: "12 minutes ago",
      device: "server-prod-01",
      status: "active",
    },
    {
      id: "3",
      title: "Unauthorized port scan",
      severity: "medium",
      timestamp: "28 minutes ago",
      device: "gateway-01",
      status: "mitigated",
    },
    {
      id: "4",
      title: "SSL certificate expiration warning",
      severity: "low",
      timestamp: "1 hour ago",
      device: "api-server-02",
      status: "mitigated",
    },
    {
      id: "5",
      title: "Brute force attack detected",
      severity: "high",
      timestamp: "2 hours ago",
      device: "auth-service-03",
      status: "mitigated",
    },
  ];

  return (
    <section className="bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white font-mono">
            Recent Threats & Events
          </h2>
          <Button
            variant="ghost"
            className="text-blue-400 hover:bg-blue-500/10"
            aria-label="View all threats"
          >
            View All
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left px-4 py-3 text-sm font-mono text-slate-400">
                  Threat
                </th>
                <th className="text-left px-4 py-3 text-sm font-mono text-slate-400">
                  Device
                </th>
                <th className="text-left px-4 py-3 text-sm font-mono text-slate-400">
                  Severity
                </th>
                <th className="text-left px-4 py-3 text-sm font-mono text-slate-400">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-sm font-mono text-slate-400">
                  Time
                </th>
                <th className="text-left px-4 py-3 text-sm font-mono text-slate-400">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {threats.map((threat) => (
                <ThreatRow key={threat.id} threat={threat} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

interface ThreatRowProps {
  threat: Threat;
}

const ThreatRow: React.FC<ThreatRowProps> = ({ threat }) => {
  const severityColors = {
    critical: "text-red-400 bg-red-500/20 border-red-500/50",
    high: "text-orange-400 bg-orange-500/20 border-orange-500/50",
    medium: "text-yellow-400 bg-yellow-500/20 border-yellow-500/50",
    low: "text-blue-400 bg-blue-500/20 border-blue-500/50",
  };

  const statusColors = {
    active: "bg-red-500/20 text-red-300",
    investigating: "bg-yellow-500/20 text-yellow-300",
    mitigated: "bg-emerald-500/20 text-emerald-300",
  };

  return (
    <tr className="border-b border-slate-700 hover:bg-slate-800/30 transition-colors group">
      <td className="px-4 py-4 text-sm text-white font-mono">{threat.title}</td>
      <td className="px-4 py-4 text-sm text-slate-400 font-mono">
        {threat.device}
      </td>
      <td className="px-4 py-4">
        <span
          className={`px-3 py-1 text-xs font-mono border rounded ${severityColors[threat.severity]}`}
        >
          {threat.severity.toUpperCase()}
        </span>
      </td>
      <td className="px-4 py-4">
        <span
          className={`px-3 py-1 text-xs font-mono rounded ${statusColors[threat.status]}`}
        >
          {threat.status}
        </span>
      </td>
      <td className="px-4 py-4 text-sm text-slate-400 font-mono">
        {threat.timestamp}
      </td>
      <td className="px-4 py-4">
        <Button
          size="sm"
          variant="ghost"
          className="text-blue-400 hover:bg-blue-500/10 h-8 px-2"
          aria-label={`View details for ${threat.title}`}
        >
          <Eye className="w-4 h-4" />
        </Button>
      </td>
    </tr>
  );
};

// ============================================================================
// CHARTS SECTION - THREAT DISTRIBUTION
// ============================================================================

const ThreatDistributionChart: React.FC = () => {
  const data = [
    { label: "Critical", count: 3, color: "bg-red-500" },
    { label: "High", count: 12, color: "bg-orange-500" },
    { label: "Medium", count: 45, color: "bg-yellow-500" },
    { label: "Low", count: 187, color: "bg-blue-500" },
  ];

  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <section className="bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white font-mono mb-8">
          Threat Distribution
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar chart */}
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white font-mono">
                Threats by Severity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.map((item) => {
                  const percentage = (item.count / total) * 100;
                  return (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-300 font-mono">
                          {item.label}
                        </span>
                        <span className="text-sm font-bold text-white font-mono">
                          {item.count}
                        </span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                          role="progressbar"
                          aria-valuenow={Math.round(percentage)}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Summary stats */}
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white font-mono">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.map((item) => {
                  const percentage = ((item.count / total) * 100).toFixed(1);
                  return (
                    <div
                      key={item.label}
                      className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded ${item.color}`} />
                        <span className="text-sm text-slate-300 font-mono">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-white font-mono">
                        {percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// INCIDENTS OVER TIME CHART
// ============================================================================

const IncidentsTimelineChart: React.FC = () => {
  const data: ChartDataPoint[] = [
    { time: "6h ago", incidents: 8, resolved: 6 },
    { time: "5h ago", incidents: 12, resolved: 10 },
    { time: "4h ago", incidents: 5, resolved: 5 },
    { time: "3h ago", incidents: 18, resolved: 12 },
    { time: "2h ago", incidents: 14, resolved: 11 },
    { time: "1h ago", incidents: 9, resolved: 8 },
    { time: "Now", incidents: 7, resolved: 5 },
  ];

  const maxIncidents = Math.max(
    ...data.map((d) => Math.max(d.incidents, d.resolved)),
  );

  return (
    <section className="bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white font-mono">
            Incidents Over Time
          </h2>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded" />
              <span className="text-xs text-slate-400 font-mono">
                Incidents
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded" />
              <span className="text-xs text-slate-400 font-mono">Resolved</span>
            </div>
          </div>
        </div>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-6">
            {/* Mini line chart visualization */}
            <div className="flex items-end justify-between h-48 gap-2">
              {data.map((point) => {
                const incidentHeight = (point.incidents / maxIncidents) * 100;
                const resolvedHeight = (point.resolved / maxIncidents) * 100;

                return (
                  <div
                    key={point.time}
                    className="flex-1 flex flex-col items-center gap-2 group"
                  >
                    {/* Bar chart columns */}
                    <div className="w-full flex items-end justify-center gap-1 h-32">
                      <div
                        className="flex-1 bg-red-500/70 rounded-t opacity-70 group-hover:opacity-100 transition-opacity"
                        style={{ height: `${incidentHeight}%` }}
                      />
                      <div
                        className="flex-1 bg-emerald-500/70 rounded-t opacity-70 group-hover:opacity-100 transition-opacity"
                        style={{ height: `${resolvedHeight}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 font-mono text-center whitespace-nowrap">
                      {point.time}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Data table */}
            <div className="mt-8 border-t border-slate-700 pt-6">
              <div className="grid grid-cols-3 sm:grid-cols-7 gap-4 text-center">
                {data.map((point) => (
                  <div key={point.time}>
                    <p className="text-xs text-slate-400 font-mono mb-2">
                      {point.time}
                    </p>
                    <p className="text-sm font-bold text-red-400 font-mono">
                      {point.incidents}
                    </p>
                    <p className="text-xs text-emerald-400 font-mono">
                      {point.resolved} ✓
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

// ============================================================================
// SCANNING TASKS / FORM SECTION
// ============================================================================

const ScanningTasksSection: React.FC = () => {
  const [taskName, setTaskName] = useState("");
  const [scanType, setScanType] = useState("network");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName.trim()) {
      console.log(`Creating ${scanType} scan: ${taskName}`);
      setTaskName("");
    }
  };

  const activeTasks = [
    {
      id: "1",
      name: "Full Network Scan",
      type: "network",
      progress: 45,
      startTime: "15 min ago",
    },
    {
      id: "2",
      name: "Vulnerability Assessment",
      type: "vulnerability",
      progress: 78,
      startTime: "8 min ago",
    },
    {
      id: "3",
      name: "Malware Detection",
      type: "malware",
      progress: 92,
      startTime: "3 min ago",
    },
  ];

  return (
    <section className="bg-slate-900/50 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white font-mono mb-8">
          Scanning Tasks
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* New Task Form */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white font-mono flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create New Scan
              </CardTitle>
              <CardDescription className="text-slate-400">
                Schedule a security scan task
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-slate-300 font-mono mb-2 block">
                    Scan Name
                  </label>
                  <Input
                    placeholder="e.g., Critical Assets Scan"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-300 font-mono mb-2 block">
                    Scan Type
                  </label>
                  <select
                    value={scanType}
                    onChange={(e) => setScanType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-600 text-white rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="network">Network Scan</option>
                    <option value="vulnerability">Vulnerability Scan</option>
                    <option value="malware">Malware Detection</option>
                    <option value="compliance">Compliance Check</option>
                    <option value="penetration">Penetration Test</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-mono"
                  aria-label="Start new scan"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Scan
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Active Tasks */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white font-mono flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Active Tasks
              </CardTitle>
              <CardDescription className="text-slate-400">
                Currently running scans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 bg-slate-900/50 border border-slate-700 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-mono text-white font-semibold">
                          {task.name}
                        </p>
                        <p className="text-xs text-slate-400 font-mono">
                          {task.startTime}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-blue-400">
                        {task.progress}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-300"
                        style={{ width: `${task.progress}%` }}
                        role="progressbar"
                        aria-valuenow={task.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

// Placeholder for missing icon
const Play = AlertCircle;

// ============================================================================
// DEVICES STATUS SECTION
// ============================================================================

const DevicesStatusSection: React.FC = () => {
  const devices: Device[] = [
    {
      id: "1",
      name: "server-prod-01",
      status: "online",
      lastSeen: "2 min ago",
      threatLevel: "low",
    },
    {
      id: "2",
      name: "workstation-042",
      status: "online",
      lastSeen: "1 min ago",
      threatLevel: "medium",
    },
    {
      id: "3",
      name: "gateway-01",
      status: "online",
      lastSeen: "now",
      threatLevel: "low",
    },
    {
      id: "4",
      name: "api-server-02",
      status: "at-risk",
      lastSeen: "5 min ago",
      threatLevel: "high",
    },
    {
      id: "5",
      name: "backup-server",
      status: "offline",
      lastSeen: "2 hours ago",
      threatLevel: "low",
    },
  ];

  return (
    <section className="bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white font-mono">
            Device Status
          </h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-400 hover:bg-blue-500/10"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {devices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface DeviceCardProps {
  device: Device;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device }) => {
  const statusConfig = {
    online: {
      bg: "bg-emerald-500/20",
      border: "border-emerald-500/50",
      dot: "bg-emerald-400",
      text: "text-emerald-400",
    },
    "at-risk": {
      bg: "bg-orange-500/20",
      border: "border-orange-500/50",
      dot: "bg-orange-400",
      text: "text-orange-400",
    },
    offline: {
      bg: "bg-red-500/20",
      border: "border-red-500/50",
      dot: "bg-red-400",
      text: "text-red-400",
    },
  };

  const threatConfig = {
    low: "text-emerald-400",
    medium: "text-yellow-400",
    high: "text-orange-400",
    critical: "text-red-400",
  };

  const config = statusConfig[device.status];

  return (
    <Card
      className={`${config.bg} border-2 ${config.border} hover:border-opacity-100 transition-all`}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-2 h-2 rounded-full ${config.dot}`} />
          <h3 className="text-sm font-mono text-white font-semibold truncate">
            {device.name}
          </h3>
        </div>

        <div className="space-y-2 text-xs font-mono">
          <p className={`${config.text}`}>
            {device.status.replace("-", " ").toUpperCase()}
          </p>
          <p className="text-slate-400">Last seen: {device.lastSeen}</p>
          <p className={`${threatConfig[device.threatLevel]}`}>
            Threat: {device.threatLevel.toUpperCase()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

// ============================================================================
// MAIN SECURITY DASHBOARD PAGE
// ============================================================================

const Dashboard: React.FC = () => {
  useEffect(() => {
    // Inject CSS animations
    const style = document.createElement("style");
    style.textContent = `
      @keyframes blob {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
      }

      .animate-blob {
        animation: blob 12s infinite;
      }

      .animation-delay-2000 {
        animation-delay: 2s;
      }

      .animation-delay-4000 {
        animation-delay: 4s;
      }

      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 10px;
      }

      ::-webkit-scrollbar-track {
        background: #0f172a;
      }

      ::-webkit-scrollbar-thumb {
        background: #1e40af;
        border-radius: 5px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #1e3a8a;
      }

      html {
        scroll-behavior: smooth;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <main className="w-full bg-slate-950 text-white">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-400" />
            <h1 className="text-xl font-mono font-bold text-white">
              SecureOps
            </h1>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              className="text-slate-300 hover:text-white hover:bg-slate-800"
            >
              Alerts
            </Button>
            <Button
              variant="ghost"
              className="text-slate-300 hover:text-white hover:bg-slate-800"
            >
              Reports
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Settings
            </Button>
          </div>
        </nav>
      </header>

      {/* Page Content */}
      <SecurityOverviewHero />
      <QuickStatsSection />
      <DevicesStatusSection />
      <RecentThreatsSection />
      <ThreatDistributionChart />
      <IncidentsTimelineChart />
      <ScanningTasksSection />

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400 font-mono text-sm mb-2">
            &copy; 2024 SecureOps Security Dashboard. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 flex-wrap text-sm">
            <a
              href="#"
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              Documentation
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              API Docs
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              Support
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              Status
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Dashboard;
