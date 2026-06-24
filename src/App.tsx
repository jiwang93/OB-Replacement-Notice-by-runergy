/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Printer, 
  Copy, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Github,
  AlertTriangle
} from 'lucide-react';
import { REASON_OPTIONS, ReasonOptionId } from './types';

export default function App() {
  const [selectedReason, setSelectedReason] = useState<ReasonOptionId>('option_a');
  const [notes, setNotes] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [copied, setCopied] = useState(false);

  const refreshTimestamp = () => {
    const now = new Date();
    const formatted = now.toISOString().replace('T', ' ').substring(0, 19);
    setTimestamp(formatted);
  };

  useEffect(() => {
    refreshTimestamp();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const letterContent = `
===================================================
             QUALITY NOTICE / 质量通知
===================================================
NOTICE TYPE / 通知主题:
This pallet/box was replaced by the OB Team
(此托/箱 ，是被OB团队替换下来。)

TIMESTAMP / 记录时间:
${timestamp}

DISPOSITION REASON / 处理原因:
[${selectedReason === 'option_a' ? 'X' : ' '}] a) Not in current batch — Return to inventory storage location (不在批次，重回库位)
[${selectedReason === 'option_b' ? 'X' : ' '}] b) Physical appearance damaged — Requires rework / repair (外观损坏，需要返工)
[${selectedReason === 'option_c' ? 'X' : ' '}] c) Power specification mismatch — Does not meet shipment standards (功率不符合出货要求)

REMARKS / 备注说明:
${notes || 'None (无)'}

WARNING: DO NOT MOVE OR SHIP THIS PALLET WITHOUT AUTHORIZATION.
严禁擅自移动、拆除标签或发运此托盘。
===================================================
    `.trim();

    navigator.clipboard.writeText(letterContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Bar (Hidden in Print) */}
      <header className="no-print border-b border-slate-800 bg-slate-900 px-6 py-4 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 rounded-lg text-slate-950 font-bold font-mono">
              QA
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-100 tracking-tight">
                Pallet Replacement Notice Printer
              </h1>
              <p className="text-xs text-slate-400">
                Online Tag Generator · GitHub Storage & Vercel Deployment Ready
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-6 py-2 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 shadow transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Notice</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Controls Column (Hidden in Print) */}
        <div className="no-print lg:col-span-4 space-y-6">
          
          {/* Form Settings */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
              <FileText className="w-4 h-4 text-amber-400" /> Notice Settings
            </h2>

            {/* Field 1: Subject (Fixed) */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">
                1. Notice Type / Subject
              </label>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-semibold text-sm">
                <div>This pallet/box was replaced by the OB Team</div>
                <div className="text-xs text-slate-400 mt-1 font-normal">此托/箱 ，是被OB团队替换下来。</div>
              </div>
            </div>

            {/* Field 2: Timestamp */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="timestamp-input" className="text-xs font-medium text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 2. Date / Timestamp
                </label>
                <button
                  onClick={refreshTimestamp}
                  className="text-xs text-amber-400 hover:underline inline-flex items-center gap-1 font-mono cursor-pointer"
                  type="button"
                >
                  <RefreshCw className="w-3 h-3" /> Now
                </button>
              </div>
              <input
                id="timestamp-input"
                type="text"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-sm font-mono focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Field 3: Disposition Options */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400">
                3. Disposition Reason (Select One)
              </label>
              <div className="space-y-2 pt-1">
                {REASON_OPTIONS.map((option) => {
                  const isSelected = selectedReason === option.id;
                  return (
                    <div
                      key={option.id}
                      onClick={() => setSelectedReason(option.id)}
                      className={`p-3 rounded-lg border transition cursor-pointer flex items-start gap-3 ${
                        isSelected 
                          ? 'bg-amber-500/10 border-amber-500 text-slate-100' 
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                        isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {option.labelCode}
                      </div>
                      <div className="text-xs leading-snug">
                        <p className={isSelected ? 'font-semibold text-slate-100' : 'text-slate-300'}>
                          {option.englishText}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {option.chineseHint}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Optional Remarks */}
            <div className="space-y-1">
              <label htmlFor="notes-input" className="text-xs font-medium text-slate-400">
                Remarks / Action Notes (Optional)
              </label>
              <textarea
                id="notes-input"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-amber-500 resize-none"
                placeholder="Type additional notes..."
              />
            </div>

            <button
              onClick={handlePrint}
              className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-lg flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Big Notice Sheet</span>
            </button>
          </div>

          {/* GitHub / Vercel Help */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2 text-slate-400">
            <p className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Github className="w-4 h-4 text-slate-100" /> GitHub & Vercel Publishing
            </p>
            <p className="leading-relaxed">
              To publish online: Export this project to your <strong className="text-slate-200">GitHub</strong> account via the top-right AI Studio settings menu, then connect that repository directly in <strong className="text-slate-200">Vercel</strong>.
            </p>
          </div>
        </div>

        {/* Right Column: Printable Big Sheet Preview */}
        <div className="lg:col-span-8 print-container flex flex-col items-center">
          <div className="no-print w-full mb-3 text-xs text-slate-400 flex justify-between">
            <span>Print Preview (A4 / Letter Tag)</span>
            <span>High Contrast Floor Tag</span>
          </div>

          {/* PRINTABLE LETTER STAGE */}
          <div 
            id="printable-letter" 
            className="w-full bg-white text-black p-10 sm:p-14 shadow-2xl rounded-lg border border-slate-800 flex flex-col justify-between"
            style={{ minHeight: '920px', maxWidth: '820px' }}
          >
            <div>
              {/* PART 1: QUALITY NOTICE */}
              <div className="border-8 border-black p-6 mb-10 text-center bg-black text-white">
                <div className="flex items-center justify-center gap-4">
                  <AlertTriangle className="w-10 h-10 sm:w-14 sm:h-14 stroke-[2.5]" />
                  <div className="flex flex-col items-center">
                    <h1 className="text-4xl sm:text-6xl font-black tracking-widest uppercase font-display leading-none">
                      QUALITY NOTICE
                    </h1>
                    <p className="text-base sm:text-2xl font-bold tracking-widest text-gray-300 mt-2">
                      质量管理通知单
                    </p>
                  </div>
                  <AlertTriangle className="w-10 h-10 sm:w-14 sm:h-14 stroke-[2.5]" />
                </div>
              </div>

              {/* PART 2: NOTICE TYPE / SUBJECT */}
              <div className="mb-10 border-b-4 border-black pb-8">
                <div className="text-sm sm:text-base font-black tracking-widest uppercase text-gray-700 mb-2 flex items-baseline gap-2">
                  <span>NOTICE TYPE:</span>
                  <span className="text-xs sm:text-sm font-bold text-gray-500 font-sans">通知主题：</span>
                </div>
                <div className="text-3xl sm:text-5xl font-black uppercase text-black leading-tight tracking-tight underline decoration-4 underline-offset-8">
                  This pallet/box was replaced by the OB Team
                </div>
                <div className="text-lg sm:text-2xl font-bold text-gray-700 mt-3 font-sans">
                  此托/箱 ，是被OB团队替换下来。
                </div>
              </div>

              {/* PART 3: TIMESTAMP / DATE ONLY (NO PALLET SERIAL) */}
              <div className="mb-10 border-4 border-black p-6 bg-gray-100">
                <div className="text-sm sm:text-base font-black tracking-widest uppercase text-gray-700 mb-2 flex items-baseline gap-2">
                  <span>TIMESTAMP / DATE RECORDED:</span>
                  <span className="text-xs sm:text-sm font-bold text-gray-500 font-sans">记录时间 / 日期：</span>
                </div>
                <div className="text-3xl sm:text-5xl font-mono font-black text-black">
                  {timestamp || 'UNKNOWN DATE'}
                </div>
              </div>

              {/* PART 4: DISPOSITION REASON & REMARKS */}
              <div className="mb-10">
                <div className="text-base sm:text-lg font-black tracking-wider uppercase text-black mb-4 border-b-2 border-black pb-2 flex items-baseline justify-between">
                  <span>DISPOSITION REASON & REQUIRED ACTION:</span>
                  <span className="text-xs sm:text-sm font-bold text-gray-600 font-sans">处理原因及要求措施：</span>
                </div>

                <div className="space-y-4 pt-1">
                  {REASON_OPTIONS.map((opt) => {
                    const checked = selectedReason === opt.id;
                    return (
                      <div 
                        key={opt.id} 
                        className={`flex items-start gap-4 p-5 border-4 ${checked ? 'border-black bg-gray-100 font-bold' : 'border-gray-300 opacity-50'}`}
                      >
                        <div className="mt-0.5 w-8 h-8 sm:w-10 sm:h-10 border-4 border-black flex items-center justify-center font-black text-xl sm:text-2xl bg-white shrink-0">
                          {checked ? '✓' : ''}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-baseline gap-3">
                            <span className="font-mono font-bold text-base sm:text-xl uppercase">[{opt.labelCode}]</span>
                            <span className="text-lg sm:text-2xl text-black font-black uppercase leading-snug">
                              {opt.englishText}
                            </span>
                          </div>
                          <div className="text-sm sm:text-lg font-bold text-gray-700 mt-1 pl-8 font-sans">
                            {opt.chineseHint}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* REMARKS BLOCK */}
              <div className="border-t-4 border-black pt-6 mb-8">
                <div className="text-sm font-black tracking-wider uppercase text-gray-700 mb-2 flex items-baseline gap-2">
                  <span>REMARKS / OBSERVATIONS:</span>
                  <span className="text-xs font-bold text-gray-500 font-sans">备注说明：</span>
                </div>
                <div className="text-lg font-bold text-black bg-gray-50 p-4 border-2 border-gray-400 min-h-[64px]">
                  {notes || 'No secondary remarks noted. (无额外备注)'}
                </div>
              </div>
            </div>

            {/* FOOTER WARNING WARNING NOTE */}
            <div className="border-t-8 border-black pt-6 text-center mt-8">
              <p className="text-base sm:text-xl font-black tracking-widest uppercase text-black">
                *** STRICT WARNING: DO NOT REMOVE THIS TAG OR SHIP PALLET WITHOUT AUTHORIZATION ***
              </p>
              <p className="text-xs sm:text-sm font-bold text-gray-700 mt-1 tracking-wider font-sans">
                *** 严禁擅自拆除本标签或移动、发运此托盘 ***
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="no-print mt-auto border-t border-slate-900 py-4 text-center text-xs text-slate-600">
        <p>Pallet Replacement Notice Printer</p>
      </footer>
    </div>
  );
}
