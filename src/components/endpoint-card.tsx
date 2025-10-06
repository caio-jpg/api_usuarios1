"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "./code-block";
import { ChevronsUpDown } from "lucide-react";
import type { apiSpec } from '@/lib/api-spec';

type EndpointCardProps = (typeof apiSpec)[0]['endpoints'][0];

const getMethodClass = (method: string) => {
  switch (method.toUpperCase()) {
    case "GET":
      return "bg-sky-600 hover:bg-sky-700";
    case "POST":
      return "bg-green-600 hover:bg-green-700";
    case "PUT":
      return "bg-amber-600 hover:bg-amber-700";
    case "DELETE":
      return "bg-red-600 hover:bg-red-700";
    default:
      return "bg-gray-600 hover:bg-gray-700";
  }
};

export function EndpointCard({ method, path, summary, description, parameters, requestBody, responses }: EndpointCardProps) {
  const hasContent = parameters || requestBody || responses;

  return (
    <Collapsible className="border rounded-lg shadow-sm bg-card">
      <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-left group">
        <div className="flex items-center gap-4">
          <Badge className={`text-sm font-bold w-24 justify-center text-white ${getMethodClass(method)}`}>
            {method}
          </Badge>
          <span className="font-mono text-sm font-medium text-foreground">{path}</span>
          <span className="text-sm text-muted-foreground hidden md:inline">{summary}</span>
        </div>
        {hasContent && (
          <ChevronsUpDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
        )}
      </CollapsibleTrigger>
      {hasContent && (
      <CollapsibleContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <Tabs defaultValue={parameters ? "params" : "body"} className="w-full">
          <TabsList>
            {parameters && <TabsTrigger value="params">Parâmetros</TabsTrigger>}
            {requestBody && <TabsTrigger value="body">Corpo da Requisição</TabsTrigger>}
            {responses && <TabsTrigger value="responses">Respostas</TabsTrigger>}
          </TabsList>
          
          {parameters && (
            <TabsContent value="params" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Em</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Obrigatório</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parameters.map(param => (
                    <TableRow key={param.name}>
                      <TableCell className="font-mono">{param.name}</TableCell>
                      <TableCell>{param.in}</TableCell>
                      <TableCell>{param.description}</TableCell>
                      <TableCell>{param.required ? 'Sim' : 'Não'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          )}

          {requestBody && (
            <TabsContent value="body" className="mt-4 space-y-4">
              <p className="text-sm">{requestBody.description}</p>
              <h4 className="font-semibold">Exemplo de Requisição:</h4>
              <CodeBlock code={requestBody.example} language="json" />
            </TabsContent>
          )}

          {responses && (
             <TabsContent value="responses" className="mt-4 space-y-4">
               {Object.entries(responses).map(([status, response]) => (
                 <div key={status}>
                  <h4 className="font-semibold mb-2">
                    <Badge variant={status.startsWith('2') ? 'default' : 'destructive'} className={status.startsWith('2') ? 'bg-accent' : ''}>{status}</Badge> {response.description}
                  </h4>
                  <CodeBlock code={response.code} language="json" />
                 </div>
               ))}
             </TabsContent>
          )}
        </Tabs>
      </CollapsibleContent>
      )}
    </Collapsible>
  );
}
