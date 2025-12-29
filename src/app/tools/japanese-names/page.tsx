"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function JapaneseNamesPage() {
  const [name, setName] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    
    setLoading(true);
    setError('');
    setResult(null);
    
    try {
      const res = await fetch(`/api/japanese-names?name=${encodeURIComponent(name)}`);
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError('An error occurred while fetching readings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Japanese Name Readings</h1>
        <p className="text-xl text-muted-foreground">
            Find the different ways to read Japanese surnames and names.
            Enter a Kanji name (e.g., 佐藤) to see its pronunciations.
        </p>
      </div>
      
      <div className="max-w-xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Name Search</CardTitle>
            <CardDescription>Enter Japanese Kanji (e.g., 田中)</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
              <Input 
                placeholder="Enter Kanji..." 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="flex-1 text-lg"
              />
              <Button type="submit" disabled={loading} size="lg">
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg text-center border border-red-200">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <Card className="border-2 border-blue-100">
                <CardContent className="pt-6">
                    <div className="flex justify-between items-start border-b pb-4 mb-4">
                        <div>
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Kanji</h3>
                            <p className="text-4xl font-bold text-gray-900 mt-1">{result.original}</p>
                        </div>
                        <div className="text-right">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Type</h3>
                            <span className="inline-block mt-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium capitalize">
                                {result.type || 'Unknown'}
                            </span>
                        </div>
                    </div>
                    
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                            Readings (Kana)
                        </h3>
                        <div className="flex flex-wrap gap-2">
                             {Array.isArray(result.kana) && result.kana.length > 0 ? (
                                 result.kana.map((k: string, i: number) => (
                                     <span key={i} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium border border-blue-100 shadow-sm">
                                         {k}
                                     </span>
                                 ))
                             ) : result.kana ? (
                                 <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium border border-blue-100 shadow-sm">
                                     {result.kana}
                                 </span>
                             ) : (
                                 <span className="text-gray-400 italic">No readings found</span>
                             )}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                            Romaji
                        </h3>
                         <div className="flex flex-wrap gap-2">
                             {Array.isArray(result.romaji) && result.romaji.length > 0 ? (
                                 result.romaji.map((r: string, i: number) => (
                                     <span key={i} className="px-3 py-1 bg-green-50 text-green-700 rounded-md text-sm border border-green-100">
                                         {r}
                                     </span>
                                 ))
                             ) : result.romaji ? (
                                 <span className="px-3 py-1 bg-green-50 text-green-700 rounded-md text-sm border border-green-100">
                                     {result.romaji}
                                 </span>
                             ) : (
                                 <span className="text-gray-400 italic">No romaji found</span>
                             )}
                        </div>
                    </div>
                </CardContent>
             </Card>
          </div>
        )}
      </div>
    </div>
  );
}
