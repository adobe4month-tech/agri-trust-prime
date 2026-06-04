import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useBroadcasts, useSendBroadcast } from "@/hooks/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Send } from "lucide-react";
import { toast } from "sonner";
import type { BroadcastMessage } from "@/lib/api/types";

export default function AdminNotifications() {
  const { data: list = [] } = useBroadcasts();
  const send = useSendBroadcast();
  const [m, setM] = useState<Omit<BroadcastMessage, "id" | "sentAt">>({ channel: "whatsapp", body: "", audience: "all" });

  return (
    <AdminLayout title="Notifications" subtitle="Broadcast push / SMS / WhatsApp messages">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="premium-card p-4 space-y-3">
          <h2 className="font-extrabold">New broadcast</h2>
          <div>
            <Label>Channel</Label>
            <Select value={m.channel} onValueChange={(v) => setM({ ...m, channel: v as any })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="whatsapp">WhatsApp</SelectItem><SelectItem value="sms">SMS</SelectItem><SelectItem value="push">Push</SelectItem></SelectContent>
            </Select>
          </div>
          <div>
            <Label>Audience</Label>
            <Select value={m.audience} onValueChange={(v) => setM({ ...m, audience: v as any })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="all">All users</SelectItem><SelectItem value="buyers">Buyers only</SelectItem><SelectItem value="sellers">Sellers only</SelectItem><SelectItem value="vip">VIP / repeat buyers</SelectItem></SelectContent>
            </Select>
          </div>
          {m.channel !== "sms" && <div><Label>Subject</Label><Input value={m.subject || ""} onChange={e => setM({ ...m, subject: e.target.value })} /></div>}
          <div><Label>Message</Label><Textarea rows={5} value={m.body} onChange={e => setM({ ...m, body: e.target.value })} maxLength={500} /></div>
          <Button variant="hero" disabled={!m.body || send.isPending} onClick={async () => { await send.mutateAsync(m); toast.success("Broadcast sent"); setM({ ...m, body: "", subject: "" }); }}><Send className="h-4 w-4" />Send broadcast</Button>
        </div>

        <div className="premium-card p-4">
          <h2 className="font-extrabold mb-3">Recent broadcasts</h2>
          <div className="space-y-2">
            {list.length === 0 && <p className="text-sm text-muted-foreground">No broadcasts yet.</p>}
            {list.map(b => (
              <div key={b.id} className="border border-border rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className="text-[10px] uppercase">{b.channel}</Badge>
                  <Badge variant="outline" className="text-[10px]">{b.audience}</Badge>
                  <span className="text-[10px] text-muted-foreground ml-auto">{b.sentAt && new Date(b.sentAt).toLocaleString()}</span>
                </div>
                {b.subject && <p className="font-bold text-sm">{b.subject}</p>}
                <p className="text-sm">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
