export const rankFor = xp => xp < 100 ? 'Recruta' : xp < 300 ? 'Soldado' : xp < 700 ? 'Cabo' : xp < 1300 ? 'Sargento' : 'Tenente';
export const nextRank = xp => ([100,300,700,1300].find(n=>n>xp) ?? xp+500);
export const grade = (answer, correct) => answer === correct ? {correct:true,xp:20} : {correct:false,xp:5};
export const reviewDate = (correct, streak=0) => { const days = correct ? Math.min(30, Math.max(1, 2 ** Math.min(streak,4))) : 0; const d=new Date(); d.setDate(d.getDate()+days); return d.toISOString(); };
