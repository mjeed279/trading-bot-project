"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ApiKeyDialog() {
  const [binanceKey, setBinanceKey] = useState("");
  const [binanceSecret, setBinanceSecret] = useState("");
  const [mexcKey, setMexcKey] = useState("");
  const [mexcSecret, setMexcSecret] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async () => {
    console.log("Submitting API Keys:", {
      binanceKey,
      binanceSecret,
      mexcKey,
      mexcSecret,
    });
    // TODO: Implement API call to securely send keys to backend
    // Example: await fetch("/api/settings/keys", { method: "POST", body: JSON.stringify(...) });
    // Handle success/error response
    setIsOpen(false); // Close dialog on submit
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Manage API Keys</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage API Keys</DialogTitle>
          <DialogDescription>
            Enter your API keys and secrets for Binance and MEXC. These will be stored securely.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="binance-key" className="text-right">
              Binance Key
            </Label>
            <Input
              id="binance-key"
              value={binanceKey}
              onChange={(e) => setBinanceKey(e.target.value)}
              className="col-span-3"
              placeholder="Enter Binance API Key"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="binance-secret" className="text-right">
              Binance Secret
            </Label>
            <Input
              id="binance-secret"
              type="password"
              value={binanceSecret}
              onChange={(e) => setBinanceSecret(e.target.value)}
              className="col-span-3"
              placeholder="Enter Binance API Secret"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mexc-key" className="text-right">
              MEXC Key
            </Label>
            <Input
              id="mexc-key"
              value={mexcKey}
              onChange={(e) => setMexcKey(e.target.value)}
              className="col-span-3"
              placeholder="Enter MEXC API Key"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mexc-secret" className="text-right">
              MEXC Secret
            </Label>
            <Input
              id="mexc-secret"
              type="password"
              value={mexcSecret}
              onChange={(e) => setMexcSecret(e.target.value)}
              className="col-span-3"
              placeholder="Enter MEXC API Secret"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>Save Keys</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

