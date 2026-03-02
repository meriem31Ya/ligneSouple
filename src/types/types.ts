/**
 * types/security.ts
 *
 * Complete TypeScript type definitions for the Security Dashboard.
 * Ensures type safety across the entire application.
 */

// ============================================================================
// SECURITY METRICS & MONITORING
// ============================================================================

/**
 * Key security metric for dashboard overview
 */
export interface SecurityMetric {
  /** Human-readable label */
  label: string;

  /** Current metric value */
  value: string | number;

  /** Percentage change from previous period */
  change?: number;

  /** Direction of change (positive, negative, neutral) */
  changeType?: "positive" | "negative" | "neutral";

  /** Icon component to display */
  icon: React.ReactNode;

  /** Last update timestamp */
  lastUpdated?: Date;
}

/**
 * System health status levels
 */
export type HealthStatus = "operational" | "warning" | "elevated" | "critical";

/**
 * System status overview
 */
export interface SystemStatus {
  /** Overall system status */
  status: HealthStatus;

  /** Human-readable description */
  description: string;

  /** Additional details */
  details: string;

  /** Last status check time */
  lastCheck?: Date;

  /** Affected component count (if status is not operational) */
  affectedComponents?: number;
}

// ============================================================================
// THREATS & INCIDENTS
// ============================================================================

/**
 * Threat severity levels
 */
export type ThreatSeverity = "critical" | "high" | "medium" | "low";

/**
 * Threat status in incident lifecycle
 */
export type ThreatStatus =
  | "active"
  | "mitigated"
  | "investigating"
  | "resolved";

/**
 * Represents a security threat or incident
 */
export interface Threat {
  /** Unique threat identifier */
  id: string;

  /** Threat title/name */
  title: string;

  /** Detailed threat description */
  description?: string;

  /** Threat severity level */
  severity: ThreatSeverity;

  /** When threat was detected */
  timestamp: string | Date;

  /** Affected device/host name */
  device: string;

  /** Device ID for linking to device status */
  deviceId?: string;

  /** Current threat status in lifecycle */
  status: ThreatStatus;

  /** Optional: IP address or network identifier */
  sourceIp?: string;

  /** Optional: Target IP or network */
  targetIp?: string;

  /** Optional: Threat classification/category */
  category?: string;

  /** Optional: CVSS score if vulnerability */
  cvssScore?: number;

  /** Optional: Recommended action */
  recommendation?: string;

  /** Optional: Assigned analyst */
  assignedTo?: string;

  /** Optional: Timeline of updates */
  updates?: ThreatUpdate[];
}

/**
 * Update or action taken on a threat
 */
export interface ThreatUpdate {
  /** Update timestamp */
  timestamp: Date;

  /** Update message */
  message: string;

  /** User who made update */
  updatedBy?: string;

  /** New status after update */
  newStatus?: ThreatStatus;
}

/**
 * Threat trend over time
 */
export interface ThreatTrend {
  /** Time period label */
  period: string;

  /** Count of threats in period */
  count: number;

  /** Count by severity */
  bySeverity?: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

/**
 * Threat distribution summary
 */
export interface ThreatDistribution {
  /** Critical severity count */
  critical: number;

  /** High severity count */
  high: number;

  /** Medium severity count */
  medium: number;

  /** Low severity count */
  low: number;

  /** Total threats */
  total?: number;
}

// ============================================================================
// DEVICES & ASSETS
// ============================================================================

/**
 * Device operational status
 */
export type DeviceStatus = "online" | "offline" | "at-risk" | "quarantined";

/**
 * Device threat level
 */
export type ThreatLevel = "low" | "medium" | "high" | "critical";

/**
 * Represents a monitored device or asset
 */
export interface Device {
  /** Unique device identifier */
  id: string;

  /** Device hostname or name */
  name: string;

  /** Device type (e.g., server, workstation, router) */
  type?: "server" | "workstation" | "router" | "printer" | "other";

  /** Current operational status */
  status: DeviceStatus;

  /** Last time device was seen online */
  lastSeen: string | Date;

  /** Current threat level */
  threatLevel: ThreatLevel;

  /** Number of active threats */
  activeThreatCount?: number;

  /** Device IP address */
  ipAddress?: string;

  /** Device MAC address */
  macAddress?: string;

  /** Operating system */
  osType?: string;

  /** Last security scan timestamp */
  lastScanned?: Date;

  /** Antivirus status */
  antivirus?: {
    installed: boolean;
    running: boolean;
    updated: boolean;
    lastUpdate?: Date;
  };

  /** Firewall status */
  firewall?: {
    enabled: boolean;
    lastUpdated?: Date;
  };

  /** Patches/updates status */
  patches?: {
    total: number;
    installed: number;
    pending: number;
  };
}

/**
 * Device group for bulk operations
 */
export interface DeviceGroup {
  /** Group ID */
  id: string;

  /** Group name */
  name: string;

  /** Device IDs in group */
  deviceIds: string[];

  /** Group description */
  description?: string;

  /** Scan policy for group */
  scanPolicy?: string;
}

// ============================================================================
// SCANNING & SECURITY TASKS
// ============================================================================

/**
 * Type of security scan
 */
export type ScanType =
  | "network"
  | "vulnerability"
  | "malware"
  | "compliance"
  | "penetration"
  | "port-scan"
  | "web-app"
  | "ssl-tls";

/**
 * Scan execution status
 */
export type ScanStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed"
  | "paused"
  | "cancelled";

/**
 * Represents a security scanning task
 */
export interface Scan {
  /** Unique scan identifier */
  id: string;

  /** Scan name/title */
  name: string;

  /** Type of scan to perform */
  type: ScanType;

  /** Current scan progress (0-100) */
  progress: number;

  /** When scan was started */
  startTime: Date;

  /** When scan is/was completed */
  endTime?: Date;

  /** Current scan status */
  status: ScanStatus;

  /** Optional: Description of scan */
  description?: string;

  /** Target device/network for scan */
  target?: string;

  /** Devices affected by scan */
  deviceCount?: number;

  /** Findings from scan */
  findingsCount?: number;

  /** Critical findings */
  criticalCount?: number;

  /** Optional: Scan schedule if recurring */
  schedule?: string;

  /** Optional: User who initiated scan */
  initiatedBy?: string;

  /** Optional: Result report URL */
  reportUrl?: string;
}

/**
 * Scanning task status
 */
export interface ScanProgress {
  /** Scan ID */
  scanId: string;

  /** Current progress (0-100) */
  progress: number;

  /** Status message */
  message: string;

  /** Estimated time remaining in seconds */
  estimatedTimeRemaining?: number;

  /** Items scanned so far */
  itemsScanned?: number;

  /** Total items to scan */
  totalItems?: number;
}

/**
 * Scan result/findings
 */
export interface ScanResult {
  /** Result ID */
  id: string;

  /** Associated scan ID */
  scanId: string;

  /** When result was generated */
  timestamp: Date;

  /** Overall result status */
  status: "passed" | "failed" | "warnings";

  /** Total vulnerabilities found */
  vulnerabilityCount: number;

  /** Count by severity */
  bySeverity: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };

  /** Vulnerabilities found */
  vulnerabilities?: Vulnerability[];

  /** Scan duration in seconds */
  duration?: number;

  /** Items covered in scan */
  coverage?: number;
}

/**
 * Individual vulnerability finding
 */
export interface Vulnerability {
  /** Vulnerability ID (CVE if applicable) */
  id: string;

  /** Vulnerability title */
  title: string;

  /** Detailed description */
  description: string;

  /** Severity level */
  severity: ThreatSeverity;

  /** CVSS v3 score */
  cvss?: number;

  /** Affected asset/device */
  affectedAsset: string;

  /** Remediation steps */
  remediation?: string;

  /** Reference URLs */
  references?: string[];
}

/**
 * Security policy for scans/devices
 */
export interface SecurityPolicy {
  /** Policy ID */
  id: string;

  /** Policy name */
  name: string;

  /** Policy description */
  description?: string;

  /** Devices this policy applies to */
  appliedToDevices?: string[];

  /** Compliance framework (e.g., CIS, NIST) */
  framework?: string;

  /** Policy rules */
  rules?: PolicyRule[];

  /** Created timestamp */
  createdAt?: Date;

  /** Last modified timestamp */
  modifiedAt?: Date;
}

/**
 * Individual policy rule
 */
export interface PolicyRule {
  /** Rule ID */
  id: string;

  /** Rule description */
  description: string;

  /** Rule severity if violated */
  severity: ThreatSeverity;

  /** Check/validation logic */
  check: string;

  /** Remediation if failed */
  remediation?: string;
}

// ============================================================================
// ANALYTICS & CHARTING
// ============================================================================

/**
 * Data point for incident timeline chart
 */
export interface ChartDataPoint {
  /** Time label for X-axis */
  time: string;

  /** Total incidents in period */
  incidents: number;

  /** Resolved incidents in period */
  resolved: number;

  /** Optional: Unresolved count */
  unresolved?: number;
}

/**
 * Alert statistics
 */
export interface AlertStatistics {
  /** Total alerts today */
  totalToday: number;

  /** Alerts by severity */
  bySeverity: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };

  /** Alerts acknowledged */
  acknowledged: number;

  /** Alerts pending */
  pending: number;
}

/**
 * Incident metrics for KPIs
 */
export interface IncidentMetrics {
  /** Total incidents in period */
  total: number;

  /** Incidents resolved */
  resolved: number;

  /** Incidents pending */
  pending: number;

  /** Average time to resolve (minutes) */
  avgResolutionTime: number;

  /** MTTR - Mean Time To Repair (minutes) */
  mttr: number;

  /** SLA compliance percentage */
  slaCompliance: number;
}

// ============================================================================
// ALERTS & NOTIFICATIONS
// ============================================================================

/**
 * Alert type classification
 */
export type AlertType =
  | "security"
  | "performance"
  | "availability"
  | "compliance"
  | "configuration"
  | "informational";

/**
 * Alert acknowledgement status
 */
export type AlertStatus = "new" | "acknowledged" | "resolved" | "closed";

/**
 * Security alert
 */
export interface Alert {
  /** Alert ID */
  id: string;

  /** Alert type */
  type: AlertType;

  /** Alert message */
  message: string;

  /** Alert severity */
  severity: ThreatSeverity;

  /** Alert timestamp */
  timestamp: Date;

  /** Associated device (if applicable) */
  deviceId?: string;

  /** Associated threat (if applicable) */
  threatId?: string;

  /** Current status */
  status: AlertStatus;

  /** Optional: Acknowledgement timestamp */
  acknowledgedAt?: Date;

  /** Optional: Acknowledged by */
  acknowledgedBy?: string;

  /** Optional: Resolution notes */
  resolutionNotes?: string;
}

// ============================================================================
// COMPLIANCE & REPORTING
// ============================================================================

/**
 * Compliance framework standards
 */
export type ComplianceFramework =
  | "CIS"
  | "NIST"
  | "PCI-DSS"
  | "HIPAA"
  | "GDPR"
  | "SOC2"
  | "ISO27001";

/**
 * Compliance score for a device/group
 */
export interface ComplianceScore {
  /** Device or group ID */
  target: string;

  /** Framework being measured */
  framework: ComplianceFramework;

  /** Compliance score (0-100) */
  score: number;

  /** Pass count */
  passed: number;

  /** Fail count */
  failed: number;

  /** Not applicable count */
  na: number;

  /** Last assessment date */
  lastAssessment?: Date;
}

/**
 * Security report
 */
export interface SecurityReport {
  /** Report ID */
  id: string;

  /** Report title */
  title: string;

  /** Report period start */
  periodStart: Date;

  /** Report period end */
  periodEnd: Date;

  /** Report type */
  type: "summary" | "detailed" | "compliance" | "incident";

  /** Key metrics in report */
  metrics?: Record<string, number | string>;

  /** Charts/data included */
  data?: Record<string, unknown>;

  /** Generated timestamp */
  generatedAt: Date;

  /** Generated by user */
  generatedBy?: string;
}

// ============================================================================
// USER & RBAC
// ============================================================================

/**
 * User roles for security dashboard
 */
export type UserRole =
  | "admin"
  | "analyst"
  | "incident-responder"
  | "viewer"
  | "compliance-officer";

/**
 * User account
 */
export interface User {
  /** User ID */
  id: string;

  /** User name */
  name: string;

  /** Email address */
  email: string;

  /** User role(s) */
  roles: UserRole[];

  /** Account enabled */
  enabled: boolean;

  /** Last login timestamp */
  lastLogin?: Date;

  /** MFA enabled */
  mfaEnabled?: boolean;

  /** Account created date */
  createdAt?: Date;
}

/**
 * User permissions based on role
 */
export interface Permission {
  /** Permission ID */
  id: string;

  /** Resource being protected */
  resource: string;

  /** Action allowed */
  action: "read" | "create" | "update" | "delete" | "execute";

  /** Roles with this permission */
  roles: UserRole[];
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  /** Success status */
  success: boolean;

  /** Response data */
  data?: T;

  /** Error message if failed */
  error?: string;

  /** HTTP status code */
  statusCode: number;

  /** Request ID for debugging */
  requestId?: string;

  /** Response timestamp */
  timestamp?: Date;
}

/**
 * Paginated API response
 */
export interface PaginatedResponse<T> {
  /** Data items in current page */
  data: T[];

  /** Current page number (1-indexed) */
  page: number;

  /** Items per page */
  pageSize: number;

  /** Total items count */
  totalItems: number;

  /** Total pages available */
  totalPages: number;

  /** Has next page */
  hasNext: boolean;

  /** Has previous page */
  hasPrevious: boolean;

  /** Sort field */
  sortBy?: string;

  /** Sort direction */
  sortOrder?: "asc" | "desc";
}

/**
 * Error response
 */
export interface ErrorResponse {
  /** Error code */
  code: string;

  /** Error message */
  message: string;

  /** HTTP status code */
  statusCode: number;

  /** Additional error details */
  details?: Record<string, unknown>;

  /** Request ID for tracing */
  requestId?: string;
}

// ============================================================================
// FILTER & SEARCH TYPES
// ============================================================================

/**
 * Threat filter criteria
 */
export interface ThreatFilter {
  /** Search query */
  query?: string;

  /** Filter by severity */
  severity?: ThreatSeverity[];

  /** Filter by status */
  status?: ThreatStatus[];

  /** Filter by device */
  device?: string;

  /** Filter by date range */
  dateRange?: {
    start: Date;
    end: Date;
  };

  /** Sort field */
  sortBy?: "timestamp" | "severity" | "status";

  /** Sort direction */
  sortOrder?: "asc" | "desc";
}

/**
 * Device filter criteria
 */
export interface DeviceFilter {
  /** Search query */
  query?: string;

  /** Filter by status */
  status?: DeviceStatus[];

  /** Filter by threat level */
  threatLevel?: ThreatLevel[];

  /** Filter by device type */
  type?: Device["type"][];

  /** Only show devices with active threats */
  onlyThreats?: boolean;
}

/**
 * Scan filter criteria
 */
export interface ScanFilter {
  /** Filter by scan type */
  type?: ScanType[];

  /** Filter by status */
  status?: ScanStatus[];

  /** Filter by date range */
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// ============================================================================
// COMPONENT PROPS TYPES
// ============================================================================

/**
 * Props for KeyMetricCard
 */
export interface KeyMetricCardProps {
  metric: SecurityMetric;
  onClick?: (metric: SecurityMetric) => void;
}

/**
 * Props for ThreatRow
 */
export interface ThreatRowProps {
  threat: Threat;
  onView?: (threat: Threat) => void;
  onAcknowledge?: (threatId: string) => void;
}

/**
 * Props for DeviceCard
 */
export interface DeviceCardProps {
  device: Device;
  onClick?: (device: Device) => void;
}

/**
 * Props for StatusCard
 */
export interface StatusCardProps {
  title: string;
  status: HealthStatus;
  description: string;
  details: string;
}

// ============================================================================
// HOOK RETURN TYPES
// ============================================================================

/**
 * Return type for data fetching hooks
 */
export interface UseQueryResult<T> {
  /** Fetched data */
  data: T | null;

  /** Loading state */
  loading: boolean;

  /** Error if any */
  error: Error | null;

  /** Refetch function */
  refetch: () => Promise<void>;
}

/**
 * Return type for mutation hooks
 */
export interface UseMutationResult<T, V> {
  /** Execute mutation */
  mutate: (variables: V) => Promise<T>;

  /** Loading state */
  loading: boolean;

  /** Error if any */
  error: Error | null;

  /** Result data */
  data: T | null;
}

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * Namespace for all type exports
 */
export namespace Security {
  export type Metric = SecurityMetric;
  export type Threat = Threat;
  export type Device = Device;
  export type Scan = Scan;
  export type Alert = Alert;
  export type ThreatSeverity = ThreatSeverity;
  export type DeviceStatus = DeviceStatus;
}

export default Security;
