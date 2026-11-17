import{Suspense}from"react";
import{connection}from"next/server";
import{EditTuitionForm}from"./edit-form";
async function RuntimeMarker(){await connection();return null}
export default function Page(){return <Suspense fallback={<div className="empty">Loading tuition...</div>}><RuntimeMarker/><EditTuitionForm/></Suspense>}
