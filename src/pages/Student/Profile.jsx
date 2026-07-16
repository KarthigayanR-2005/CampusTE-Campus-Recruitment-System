import ProfileHeader from "../../components/student/profile/ProfileHeader";
import ProfileSidebar from "../../components/student/profile/ProfileSidebar";
import PersonalInformation from "../../components/student/profile/PersonalInformation";
import Education from "../../components/student/profile/Education";
import Skills from "../../components/student/profile/Skills";
import Projects from "../../components/student/profile/Projects";
import Experience from "../../components/student/profile/Experience";
import Certifications from "../../components/student/profile/Certifications";
import SocialLinks from "../../components/student/profile/SocialLinks";
import ResumeUpload from "../../components/student/profile/ResumeUpload";

function Profile() {
  return (
    <div className="space-y-8">

      <ProfileHeader />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

        {/* Left Sidebar */}

        <aside className="lg:col-span-4 xl:col-span-3">

          <div className="sticky top-24">

            <ProfileSidebar />

          </div>

        </aside>

        {/* Main Content */}

        <main className="space-y-8 lg:col-span-8 xl:col-span-9">

          <PersonalInformation />

          <Education />

          <Skills />

          <Projects />

          <Experience />

          <Certifications />

          <SocialLinks />

          <ResumeUpload />

        </main>

      </div>

    </div>
  );
}

export default Profile;