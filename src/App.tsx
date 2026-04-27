import Cover from './components/Cover'
import FadeInSection from './components/FadeInSection'
import Footer from './components/Footer'
import Guestbook from './components/Guestbook'
import InvitationMessage from './components/InvitationMessage'
import Location from './components/Location'
import PartyInfo from './components/PartyInfo'
import RSVPForm from './components/RSVPForm'
import ShareButtons from './components/ShareButtons'
import { invitationData } from './data/invitationData'
import './App.css'

function App() {
  return (
    <div className="page-shell">
      <div className="invitation-card">
        <Cover {...invitationData.cover} />

        <main className="invitation-main">
          <FadeInSection className="content-section">
            <InvitationMessage lines={invitationData.invitationMessage} />
          </FadeInSection>

          <FadeInSection className="content-section">
            <PartyInfo items={invitationData.partyInfo} />
          </FadeInSection>

          <FadeInSection className="content-section">
            <Location {...invitationData.location} />
          </FadeInSection>

          <FadeInSection className="content-section">
            <RSVPForm />
          </FadeInSection>

          <FadeInSection className="content-section">
            <Guestbook messages={invitationData.guestbookMessages} />
          </FadeInSection>

          <FadeInSection className="content-section">
            <ShareButtons />
          </FadeInSection>
        </main>

        <Footer {...invitationData.footer} />
      </div>
    </div>
  )
}

export default App
