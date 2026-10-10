import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getAccountRequests, reviewAccountRequest } from "../Services/authService";

function AccountRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const refresh = async () => {
    try {
      setRequests(await getAccountRequests());
      setError("");
    } catch (loadError) {
      setError(loadError.response?.data?.message || "Unable to load account requests.");
    }
  };
  useEffect(() => { refresh(); }, []);
  const review = async (id, approved) => {
    try {
      await reviewAccountRequest(id, approved);
      await refresh();
    } catch (reviewError) {
      setError(reviewError.response?.data?.message || "Unable to update this request.");
    }
  };

  return <div className="app-layout"><Sidebar /><main className="main-content"><Navbar /><div className="page-content">
    <div className="page-heading"><div><h1>Account requests</h1><p>Review who can access the GridPulse usage portal.</p></div><span className="request-count">{requests.length} pending</span></div>
    <section className="request-panel">
      {error && <p className="form-error" role="alert">{error}</p>}
      {requests.length === 0 ? <div className="empty-requests"><h2>All caught up</h2><p>New account requests will appear here for review.</p></div> : requests.map((request) => <article className="request-row" key={request.id}>
        <div className="request-avatar">{request.name.slice(0, 1).toUpperCase()}</div>
        <div className="request-details"><strong>{request.name}</strong><span>{request.email}</span><small>Requested {new Date(request.requestedAt).toLocaleDateString()}</small></div>
        <div className="request-actions"><button type="button" className="approve-button" onClick={() => review(request.id, true)}><Check size={17} /> Approve</button><button type="button" className="reject-button" onClick={() => review(request.id, false)} aria-label={`Reject ${request.name}`}><X size={17} /> Reject</button></div>
      </article>)}
    </section>
  </div></main></div>;
}

export default AccountRequests;
