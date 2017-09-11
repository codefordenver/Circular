task :start do
  exec 'foreman start -f Procfile.dev -p 3000'
end
