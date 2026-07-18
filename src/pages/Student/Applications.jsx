import { useMemo, useState } from "react";

import applicationsData from "../../data/applications.js";

import ApplicationsHero from "../../components/student/applications/ApplicationsHero";
import ApplicationsStats from "../../components/student/applications/ApplicationsStats";
import ApplicationSearch from "../../components/student/applications/ApplicationSearch";
import ApplicationFilters from "../../components/student/applications/ApplicationFilters";
import ApplicationsGrid from "../../components/student/applications/ApplicationsGrid";
import EmptyApplications from "../../components/student/applications/EmptyApplications";
import ApplicationPagination from "../../components/student/applications/ApplicationPagination";
import ApplicationDetailsModal from "../../components/student/applications/ApplicationDetailsModal";

function Applications() {
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    status: "",
    mode: "",
    location: "",
  });

  const [selectedApplication, setSelectedApplication] = useState(null);

  const filteredApplications = useMemo(() => {
    return applicationsData.filter((application) => {
      const matchesSearch =
        application.company.toLowerCase().includes(search.toLowerCase()) ||
        application.role.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        filters.status === "" || application.status === filters.status;

      const matchesMode =
        filters.mode === "" || application.mode === filters.mode;

      const matchesLocation =
        filters.location === "" ||
        application.location
          .toLowerCase()
          .includes(filters.location.toLowerCase());

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMode &&
        matchesLocation
      );
    });
  }, [search, filters]);

  return (
    <div className="space-y-8">
      <ApplicationsHero />

      <ApplicationsStats applications={filteredApplications} />

      <ApplicationSearch search={search} setSearch={setSearch} />

      <ApplicationFilters
        filters={filters}
        setFilters={setFilters}
      />

      {filteredApplications.length > 0 ? (
        <>
          <ApplicationsGrid
            applications={filteredApplications}
            onViewDetails={setSelectedApplication}
          />

          <ApplicationPagination />
        </>
      ) : (
        <EmptyApplications />
      )}

      {selectedApplication && (
        <ApplicationDetailsModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}
    </div>
  );
}

export default Applications;