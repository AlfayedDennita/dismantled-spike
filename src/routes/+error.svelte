<script>
  import { page } from '$app/state';
  import { m } from '$lib/paraglide/messages';
</script>

<main class="my-auto px-4 lg:px-12">
  <div
    class="mx-auto flex min-h-80 max-w-160 flex-col items-center justify-center py-12 text-center"
  >
    <h1 class="text-2xl font-extrabold text-primary uppercase">
      {m.general_error()}: {page.status}
    </h1>
    <p>{page.error.message}</p>
    <a class="btn mt-4 btn-primary" href="/" title={m.error_back_to_home()}>
      {m.error_back_to_home()}
    </a>
  </div>
</main>
