import { CreateNotebookButton } from "@/components/create-notebook-button";
import { PageWrapper } from "@/components/page-wrapper";
import { getNotebooks } from "@/server/notebooks";
import NotebookCard from "@/components/notebook-card";
import { Suspense } from "react";

async function NotebooksList() {
  const notebooks = await getNotebooks();

  return (
    <>
      <h1>Notebooks</h1>
      <CreateNotebookButton />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {notebooks.success &&
          notebooks?.notebooks?.map((notebook) => (
            <NotebookCard key={notebook.id} notebook={notebook} />
          ))}
      </div>

      {notebooks.success && notebooks?.notebooks?.length === 0 && (
        <div>No notebooks found</div>
      )}
    </>
  );
}

export default function Page() {
  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]}>
      <Suspense fallback={<div>Loading notebooks...</div>}>
        <NotebooksList />
      </Suspense>
    </PageWrapper>
  );
}
