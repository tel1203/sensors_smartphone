#!/usr/bin/ruby

require 'webrick'

# 拡張子「.rb」ファイルをCGIとして実行可能にする。
module WEBrick
  module HTTPServlet
    FileHandler.add_handler("rb", CGIHandler)
  end 
end

# 動作設定
httpdOpt_docRoot = (ARGV[0] != nil ? ARGV[0] : '.')
httpdOpt_port = (ARGV[1] != nil ? ARGV[1] : 5000)
opt = { 
  :DocumentRoot   => httpdOpt_docRoot,
  :Port           => httpdOpt_port,
  :BindAddress    => nil,
  :DirectoryIndex => ['index.html']
}
server = WEBrick::HTTPServer.new(opt)

# CGIを実行可能にする
server.mount("/", WEBrick::HTTPServlet::FileHandler, httpdOpt_docRoot)

# サーバの終了シグナルを設定する
['INT', 'TERM'].each {|signal| 
  trap(signal) {server.shutdown}
}

# サーバを開始する
server.start

