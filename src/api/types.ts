export type Language = "en" | "mr" | "hi";
export interface Source { title: string; url: string; retrieved_at: string | null; verified: boolean }
export interface Channel { name: string; url: string | null; instructions: string; verified: boolean }
export interface ServiceInfo {
  id: string; name: string; authority: string;
  jurisdiction: "bmc" | "maharashtra"; official_url: string; verified: boolean;
}

export interface Topic {
  id: string; name: string; description: string;
  complaint_enabled: boolean; example_questions: string[];
}
export interface TopicsResponse { topics: Topic[] }

export type AskStatus = "answered" | "insufficient_evidence" | "unsupported_topic";
export type AskIntent = "information" | "complaint" | "unsupported";
export interface AskRequest { question: string; language?: Language }
export interface AskResponse {
  status: AskStatus; intent: AskIntent; answer: string | null; topic_id: string | null;
  language: Language; sources: Source[]; services: ServiceInfo[]; steps: string[];
  official_channel: Channel | null; disclaimer: string; is_mock: boolean;
}

export interface AnalyzeRequest { description: string; location?: string; language?: Language }
export interface FollowUpQuestion { field: "description" | "location"; question: string }
export interface AnalyzeResponse {
  category_id: string | null; category_name: string | null; confidence: number;
  extracted: { description: string; location: string | null };
  missing_fields: string[]; follow_up_questions: FollowUpQuestion[];
  ready_to_draft: boolean; language: Language; is_mock: boolean;
}

export interface DraftRequest {
  category_id: string; description: string; location: string;
  landmark?: string; language?: Language;
}
export interface DraftResponse {
  draft: { title: string; body: string; fields: Record<string, string> };
  channel: Channel | null; other_channels: Channel[]; next_steps: string[];
  disclaimer: string; language: Language; is_mock: boolean;
}

export interface ApiErrorBody {
  error: { code: string; message: string; request_id: string | null;
           details?: { field: string; message: string }[] };
}